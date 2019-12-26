export const state = () => ({
  member: undefined,
  message_read: undefined
});

export const mutations = {
  setMember(state, member) {
    state.member = member;
  },
  setMessageRead(state, message_read) {
    state.message_read = message_read;
  }
};

export const getters = {
  member(state) {
    return state.member;
  },
  message_read(state) {
    return state.message_read;
  }
};
