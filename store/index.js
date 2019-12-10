export const state = () => ({
  member: undefined
});

export const mutations = {
  setMember(state, member) {
    state.member = member;
  }
};

export const getters = {
  member(state) {
    return state.member;
  }
};
