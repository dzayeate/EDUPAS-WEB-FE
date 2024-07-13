import ApiService from "./api.service";

export const GET_CONTESTS = "getContests";
export const SET_CONTESTS = "setContests";
export const GET_CONTEST_DETAIL = "getContestDetail";
export const SET_CONTEST_DETAIL = "setContestDetail";

const state = {
  contests: [],
  contestDetail: null, // Tambahkan state untuk contest detail
};

const getters = {
  contests(state) {
    return state.contests;
  },
  contestDetail(state) { // Tambahkan getter untuk contest detail
    return state.contestDetail;
  },
};

const actions = {
  [GET_CONTESTS](context, params) {
    const data = {
      data: [
        {
          slug: "detail-1",
          image: "event.png",
          title: "Title Event",
          description: "Sticky notes serbaguna, indah menawan, portable, juga memberikan 1 kesan pintar di lingkungan kantor.",
          discount: "Discount 70% hari ini",
          rule:"Each team must submit an original UI/UX design that has not been published before.\nThe design should reflect innovation and creativity in solving user problems.\mDesign presentations will be held in Bandung on [Presentation Date].",
          startDate: "2024-06-15 08:30:50",
          endDate: "2024-08-15 13:30:50",
          benefits: ['Certificate', 'Price Pool', 'Ticket Holliday'],
          speakers: ['Muhamad Jamaludin', 'Agam', 'Chandra'],
          organize: ['PT Kunci'],
          registers: ['adam', 'ranca', 'lukman', 'test'],
        },
        {
          slug: "detail-2",
          image: "event.png",
          title: "Title Event",
          description: "Sticky notes serbaguna, indah menawan, portable, juga memberikan 2 kesan pintar di lingkungan kantor.",
          discount: "Discount 30% hari ini",
          rule:"Each team must submit an original UI/UX design that has not been published before.\nThe design should reflect innovation and creativity in solving user problems.\nDesign presentations will be held in Bandung on [Presentation Date].",
          startDate: "2024-06-15 08:30:50",
          endDate: "2024-08-15 13:30:50",
          benefits: ['Certificate', 'Price Pool', 'Ticket Holliday'],
          speakers: ['Muhamad Jamaludin', 'Agam'],
          organize: ['PT Kunci', 'PT Skyshi'],
          registers: ['adam', 'ranca', 'lukman', 'test'],
        },
        {
          slug: "detail-3",
          image: "event.png",
          title: "Title Event",
          description: "Sticky notes serbaguna, indah menawan, portable, juga memberikan 3 kesan pintar di lingkungan kantor.",
          discount: "Discount 50% hari ini",
          rule:"Each team must submit an original UI/UX design that has not been published before.\nThe design should reflect innovation and creativity in solving user problems.\nDesign presentations will be held in Bandung on [Presentation Date].",
          startDate: "2024-06-15 08:30:50",
          endDate: "2024-08-15 13:30:50",
          benefits: ['Certificate', 'Price Pool', 'Ticket Holliday'],
          speakers: ['Muhamad Jamaludin', 'Agam'],
          organize: ['PT Kunci'],
          registers: ['adam', 'ranca', 'lukman', 'test'],
        },
        {
          slug: "detail-4",
          image: "event.png",
          title: "Title Event",
          description: "Sticky notes serbaguna, indah menawan, portable, juga memberikan kesan 4 pintar di lingkungan kantor.",
          discount: "Discount 40% hari ini",
          rule:"Each team must submit an original UI/UX design that has not been published before.\nThe design should reflect innovation and creativity in solving user problems.\nDesign presentations will be held in Bandung on [Presentation Date].",
          startDate: "2024-06-15 08:30:50",
          endDate: "2024-08-15 13:30:50",
          benefits: ['Certificate', 'Price Pool', 'Ticket Holliday'],
          speakers: ['Muhamad Jamaludin', 'Agam'],
          organize: ['PT Kunci'],
          registers: ['adam', 'ranca', 'lukman', 'test'],
        },
      ],
    };
    context.commit(SET_CONTESTS, data);
  },
  [GET_CONTEST_DETAIL](context, slug) { // Tambahkan action untuk mengambil contest detail
    const contest = state.contests.find((contest) => contest.slug === slug);
    if (contest) {
      context.commit(SET_CONTEST_DETAIL, contest);
    }
  },
};

const mutations = {
  [SET_CONTESTS](state, data) {
    state.contests = data.data;
  },
  [SET_CONTEST_DETAIL](state, contest) { // Tambahkan mutation untuk mengatur contest detail
    state.contestDetail = contest;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
