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
      toExternals: ["bilibili", "now"]
    };
  },
  methods: {
    async getNews(begin = 0, size = 20) {
      const url = `${this.apiOrigin}/news/list/gamer?begin=${begin}&size=${size}`;
      return await this.$axios.$get(url);
    },
    async getNewsById(id) {
      const url = `${this.apiOrigin}/news/findById/${id}`;
      return (await this.$axios.$get(url)).info;
    },
    async getStreamsByGame(begin = 0, size = 300) {
      return await games
        .filter(game => !!game.id)
        .map(async (game, index) => {
          const url = `${this.apiOrigin}/stream/list?sort=${game.id}&begin=${begin}&size=${size}`;
          const streams = await this.$axios.$get(url);
          const groups = helper
            .groupby(streams, "src")
            .map(x => ({ platform: x.key, amount: x.list.length }));
          return {
            index,
            game,
            streams: streams.map(x => ({
              id: x.baseId,
              source: formatter.fsource(x),
              preview: formatter.fpreview(x),
              viewers: Math.floor(x.online / 400),
              streamer_image: formatter.favatar(x),
              title: x.roomName,
              streamer_name: x.ownerName,
              game: x.sort,
              description: x.roomDesc,
              platform: x.src,
              externalLink: this.toExternals.includes(x.src) ? x.streamUrl : "",
              follows: x.fans,
              tags: x.tags ? x.tags : []
            })),
            amount: streams.length,
            amountByGroups: groups
          };
        });
    },
    async getStreams(begin = 0, size = 4, src) {
      const url = `${this.apiOrigin}/stream/list?${
        src ? "src=" + src + "&" : ""
      }begin=${begin}&size=${size}`;
      const streams = await this.$axios.$get(url);
      let twitchStreams = [];
      if (!src) {
        twitchStreams = await this.getTwitchStreams(0, size);
      }
      return streams
        .map(x => ({
          id: x.baseId,
          source: formatter.fsource(x),
          preview: formatter.fpreview(x),
          viewers: Math.floor(x.online / 400),
          streamer_image: formatter.favatar(x),
          title: x.roomName,
          streamer_name: x.ownerName,
          game: x.sort,
          description: x.roomDesc,
          platform: x.src,
          externalLink: this.toExternals.includes(x.src) ? x.streamUrl : "",
          follows: x.fans,
          tags: x.tags ? x.tags : []
        }))
        .concat(twitchStreams)
        .sort((a, b) => b.viewers - a.viewers);
    },
    async getTwitchStreams(offset = 0, amount = 4, needTags) {
      const { streams } = await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/?offset=${offset}&limit=${amount}&language=zh-tw`,
        {
          headers: {
            "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h",
            Accept: "application/vnd.twitchtv.v5+json"
          }
        }
      );
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
    async getTwitchTagsInfo(id) {
      return (
        await this.$axios.$get(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${id}`,
          { headers: { "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h" } }
        )
      ).data;
    }
  }
});
