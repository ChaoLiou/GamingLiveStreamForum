<template>
  <div class="secret">
    <v-toolbar flat color="white">
      <v-toolbar-title>任務</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">新增</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="editedItem.name"
                    label="任務名稱"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    :value="editedItem.score"
                    mask="#########"
                    @input="scoreOnInput"
                    label="積分獎勵"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="editedItem.description"
                    label="任務內容"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
            <v-btn color="blue darken-1" flat @click="save">儲存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="quests"
      class="elevation-1"
      :rows-per-page-items="[
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ]"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.score }}</td>
          <td class="justify-center align-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">
              edit
            </v-icon>
            <v-icon small @click="deleteItem(props.item)">
              delete
            </v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <div class="user-grid">
          <v-card
            v-for="(user, index) in questUserMap[props.item.id]"
            :key="index"
          >
            <v-card-text> {{ user.id }} {{ user.nickname }} </v-card-text>
          </v-card>
        </div>
        <v-dialog v-model="innerDialog" max-width="500" scrollable>
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on">
              指定
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <span>指定任務給用戶</span>
            </v-card-text>
            <v-card-text>
              <v-list>
                <template v-for="(user, index) in users">
                  <v-list-tile
                    :key="index"
                    @click="selectedUser = user"
                    :class="[selectedUser.id === user.id ? 'selected' : '']"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ user.id }} {{ user.nickname ? user.nickname : "--" }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider
                    v-if="index + 1 < users.length"
                    :key="`divider-${index}`"
                  ></v-divider>
                </template>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :dark="!!selectedUser.id"
                @click="assignQuest(props)"
                :disabled="!selectedUser.id"
              >
                指派
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  layout: "dashboard-layout",
  data: () => ({
    dialog: false,
    innerDialog: false,
    headers: [
      {
        text: "任務 ID",
        align: "left",
        value: "id"
      },
      {
        text: "任務名稱",
        value: "name"
      },
      { text: "任務內容", value: "description", sortable: false },
      { text: "積分獎勵", value: "score" },
      { text: "操作", value: "name", align: "center", sortable: false }
    ],
    quests: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      description: "",
      score: 0
    },
    defaultItem: {
      id: 0,
      name: "",
      description: "",
      score: 0
    },
    users: [],
    selectedUser: {},
    questUserMap: {}
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新增" : "編輯";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    assignQuest(props) {
      this.assignQuestToUser(this.selectedUser, props.item).then(res => {
        this.initialize();
      });
      props.expanded = false;
      this.innerDialog = false;
    },
    scoreOnInput(val) {
      this.editedItem.score = parseInt(val);
    },
    initialize() {
      this.questUserMap = {};
      this.getQuests().then(quests => {
        this.quests = quests ? quests : this.quests;
      });
      this.getUsers().then(users => {
        this.users = users ? users : this.users;
        this.users.forEach(user => {
          this.getQuestFromUser(user).then(res => {
            res.forEach(questUser => {
              if (this.questUserMap[questUser.mission]) {
                this.questUserMap[questUser.mission].push(user);
              } else {
                this.questUserMap[questUser.mission] = [user];
              }
            });
          });
        });
      });
    },
    editItem(item) {
      this.editedIndex = this.quests.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.quests.indexOf(item);
      if (confirm("Are you sure you want to delete this item?")) {
        this.deleteQuest(item.id).then(res => {
          this.initialize();
        });
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateQuest(this.editedItem).then(res => {
          this.initialize();
        });
      } else {
        this.createQuest(this.editedItem).then(res => {
          this.initialize();
        });
      }
      this.close();
    }
  }
};
</script>
<style scoped>
.selected {
  background: black;
  color: white;
}
.user-grid {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  overflow-x: scroll;
  max-width: 100vw;
}
</style>
