import Vue from "vue";
import formatter from "@/assets/utils/formatter";
import helper from "@/assets/utils/helper";
import configs from "@/assets/json/configs";
import games from "@/assets/json/games";
import platforms from "@/assets/json/platforms";
Vue.mixin({
  data() {
    return {
      apiOrigin: "https://woolive.ark-program.com",
      memberApiPrefix: "http://13.76.2.148:8000/api/v1",
      // googleAPIKey: "AIzaSyBP2admYTppwm4L9FP7YpAX2DAA3oO61sU",
      googleAPIKey: "AIzaSyA7m7LP26mFpKNuRGa7BQFGwuv3w-HpJz4",
      internals: ["youtube", "twitch", "douyu"],
      cookie_ns: "glsf",
      cookieKeys: ["id", "username", "token"]
    };
  },
  computed: {
    cookieKeysWithNS() {
      return this.cookieKeys.map(key => `${this.cookie_ns}.${key}`);
    }
  },
  methods: {
    async getMemberByLoginuser() {
      const id = this.getCookie("id");
      if (!!id) {
        return await this.login(parseInt(id));
      }
    },
    async login(id) {
      const member = await this.$axios.$get(
        `${this.memberApiPrefix}/user/${id}`
      );
      return {
        ...member,
        id,
        avatar: "/nobody.jpg"
      };
    },
    mappingStream(raw) {
      return {
        id: raw.baseId,
        source: formatter.fsource(raw),
        preview: formatter.fpreview(raw),
        viewers: raw.online,
        streamer_image: formatter.favatar(raw),
        title: raw.roomName,
        streamer_name: raw.ownerName,
        game: raw.sort,
        description: raw.roomDesc,
        platform: raw.src,
        externalLink: this.internals.includes(raw.src) ? "" : raw.streamUrl,
        follows: raw.fans,
        tags: raw.tags ? raw.tags : []
      };
    },
    setCookie(data, key) {
      const fullKey = `${this.cookie_ns}.${key}`;
      this.$cookies.set(fullKey, data);
    },
    getCookie(key) {
      return this.$cookies.get(`${this.cookie_ns}.${key}`);
    },
    removeCookie(key) {
      this.$cookies.remove(key);
    },
    logout() {
      this.cookieKeysWithNS.forEach(key => {
        this.removeCookie(key);
      });
    },
    async getNews(begin = 0, size = 20) {
      const url = `${this.apiOrigin}/news/list/gamer?begin=${begin}&size=${size}`;
      console.log(url);
      return (await this.$axios.$get(url)).map(x => {
        const result = /\d{4}-\d{2}-\d{2}/.exec(x.time);
        return {
          ...x,
          date: result ? result[0] : x.time
        };
      });
    },
    async getNewsById(id) {
      const url = `${this.apiOrigin}/news/findById/${id}`;
      console.log(url);
      return (await this.$axios.$get(url)).info;
    },
    async getStreamsByGame(begin = 0, size = 300) {
      return await games
        .filter(game => !!game.id)
        .map(async (game, index) => {
          const url = `${this.apiOrigin}/stream/list?sort=${game.id}&begin=${begin}&size=${size}`;
          console.log(url);
          const streams = await this.$axios.$get(url);
          const groups = helper
            .groupby(streams, "src")
            .map(x => ({ platform: x.key, amount: x.list.length }));
          return {
            index,
            game,
            streams: streams.map(this.mappingStream),
            amount: streams.length,
            amountByGroups: groups
          };
        });
    },
    async getStreams(
      begin = 0,
      size = 4,
      { src, sort } = { src: undefined, sort: undefined }
    ) {
      const url = `${this.apiOrigin}/stream/list?${
        src ? "src=" + src + "&" : ""
      }begin=${begin}&size=${size}${sort ? "&sort=" + sort : ""}`;
      console.log(url);
      const streams = await this.$axios.$get(url);
      let twitchStreams = [];
      // if (!src) {
      //   twitchStreams = await this.getTwitchStreams(0, size, true, sort);
      // }
      return streams
        .map(this.mappingStream)
        .concat(twitchStreams)
        .sort((a, b) => b.viewers - a.viewers);
    },
    async getStream(id) {
      const url = `${this.apiOrigin}/stream/findByBaseId/${id}`;
      console.log(url);
      const stream = await this.$axios.$get(url);
      return this.mappingStream(stream.info);
    },
    async getTwitchStreams(offset = 0, amount = 4, needTags, game) {
      const url = `https://api.twitch.tv/kraken/streams/?offset=${offset}&limit=${amount}&language=zh-tw${
        game ? "&game=" + game : ""
      }`;
      const { streams } = await this.$axios.$get(url, {
        headers: {
          "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h",
          Accept: "application/vnd.twitchtv.v5+json"
        }
      });
      if (needTags) {
        return await streams.map(async x => ({
          id: x.channel._id.toString(),
          source: `https://player.twitch.tv/?channel=${x.channel.name}&autoplay=false`,
          preview: x.preview.template,
          viewers: x.viewers,
          streamer_image: x.channel.logo,
          title: x.channel.status,
          name: x.channel.name,
          streamer_name: x.channel.display_name,
          game: x.game,
          description: x.channel.description,
          chatSource: `https://www.twitch.tv/embed/${x.channel.name}/chat`,
          platform: "twitch",
          tags: await this.getTwitchTagsInfo(x.channel._id)
        }));
      } else {
        return streams.map(x => ({
          id: x.channel._id.toString(),
          source: `https://player.twitch.tv/?channel=${x.channel.name}&autoplay=false`,
          preview: x.preview.template,
          viewers: x.viewers,
          streamer_image: x.channel.logo,
          title: x.channel.status,
          name: x.channel.name,
          streamer_name: x.channel.display_name,
          game: x.game,
          description: x.channel.description,
          chatSource: `https://www.twitch.tv/embed/${x.channel.name}/chat`,
          platform: "twitch",
          tags: []
        }));
      }
    },
    async getTwitchStream(id) {
      return [
        (
          await this.$axios.$get(`https://api.twitch.tv/kraken/streams/${id}`, {
            headers: {
              "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h",
              Accept: "application/vnd.twitchtv.v5+json"
            }
          })
        ).stream
      ].map(x => ({
        id: x.channel._id.toString(),
        source: `https://player.twitch.tv/?channel=${x.channel.name}&autoplay=true`,
        preview: x.preview.template,
        viewers: x.viewers,
        streamer_image: x.channel.logo,
        title: x.channel.status,
        name: x.channel.name,
        streamer_name: x.channel.display_name,
        game: x.game,
        description: x.channel.description,
        chatSource: `https://www.twitch.tv/embed/${x.channel.name}/chat`,
        platform: "twitch"
      }))[0];
    },
    async getTwitchTagsInfo(id) {
      return (
        await this.$axios.$get(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${id}`,
          { headers: { "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h" } }
        )
      ).data;
    },
    async getYoutubeStreams(begin = 0, size = 20, nextPageToken) {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&maxResults=${size}&key=${
        this.googleAPIKey
      }&relevanceLanguage=zh-Hans&q=${[
        "絕地求生",
        "英雄聯盟",
        "傳說對決",
        "自走棋",
        "鬥陣特工",
        "絕對武力",
        "黎明死線",
        "第五人格"
      ].join("|")}${begin ? "&pageToken=" + nextPageToken : ""}`;
      console.log(url);
      const streams = await this.$axios.$get(url);
      return streams.items.map(x => ({
        nextPageToken: streams.nextPageToken,
        id: x.id.videoId.toString(),
        source: `https://www.youtube.com/embed/${x.id.videoId}`,
        preview: x.snippet.thumbnails.high.url,
        viewers: 0,
        streamer_image: "",
        title: x.snippet.title,
        name: x.snippet.channelTitle,
        streamer_name: x.snippet.channelTitle,
        game: "",
        description: x.snippet.description,
        chatSource: `https://www.youtube.com/live_chat?v=${x.id.videoId}`,
        platform: "youtube",
        tags: []
      }));
    },
    async getYoutubeStream(id) {
      const streams = await this.$axios.$get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${this.googleAPIKey}`
      );

      return streams.items.map(x => ({
        id: x.id.toString(),
        source: `https://www.youtube.com/embed/${x.id}`,
        preview: x.snippet.thumbnails.high.url,
        viewers: x.statistics.viewCount,
        streamer_image: "",
        title: x.snippet.title,
        name: x.snippet.channelTitle,
        streamer_name: x.snippet.channelTitle,
        game: "",
        description: x.snippet.description,
        chatSource:
          `https://www.youtube.com/live_chat?v=${x.id}&embed_domain=` +
          location.host,
        platform: "youtube",
        tags: x.snippet.tags
      }))[0];
    }
  }
});
