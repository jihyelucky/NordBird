export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "똥구멍",
      img: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      Comments: [],
    }, //화면에 보일 포스트
  ],
  imagePaths: [], //미리보기 이미지
  addPostErrorReason: false, //포스트 업로드 실패 사유
  isAddingPost: false, //포스트 업로드 중
  postAdded: false, //포스트 업로드 성공
  addCommentErrorReason: false, //댓글 업로드 실패 사유
  isAddingComment: false, //댓글 업로드 중
  commentAdded: false, //댓글 업로드 성공
};

export const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: "제로초",
  },
  content: "나는 더미입니다",
  Comments: [],
};

export const dummyComment = {
  id: 1,
  User: {
    id: 1,
    nickname: "제로초",
  },
  createAt: new Date(),
  content: "더미 댓글입니다",
};
export const postRequestAction = (data) => {
  return {
    type: "ADD_POST_REQUEST",
    data,
  };
};

export const commentRequestAction = (data) => {
  return {
    type: "ADD_COMMENT_REQUEST",
    data,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST_REQUEST":
      return {
        ...state,
        isAddingPost: true,
        addPostErrorReason: "",
        postAdded: false,
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        isAddingPost: false,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    case "ADD_POST_FAILURE":
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error,
      };
    case "ADD_COMMENT_REQUEST": {
      return {
        ...state,
        isAddingComment: true,
        addCommentErrorReason: "",
        commentAdded: false,
      };
    }
    case "ADD_COMMENT_SUCCESS":
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      const Comments = [...post.Comments, dummyComment];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        mainPosts,
        isAddingComment: false,
        commentAdded: true,
      };
    case "ADD_COMMENT_FAILURE":
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
