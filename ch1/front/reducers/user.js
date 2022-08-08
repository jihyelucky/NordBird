const dummyUser = {
  nickname: "제로초",
  Post: [],
  Followings: [],
  Followers: [],
  id: 1,
};

export const initialState = {
  isLoggedIn: false, //로그인 여부
  isLoggingIn: false, //로그인 시도중
  isLoggingOut: false, //로그아웃 시도중
  logInErrorReason: "", //로그인 실패 사유
  isSignedUp: false, //회원가입성공
  isSigningUp: false, // 회원강비 시도중
  signUpErrorReason: "",
  me: null, //내 리스트
  nickname: "지해짱",
  loginData: {},
  Post: [],
  Followings: [], //팔로잉 리스트
  Followers: [], //팔로워 리스트
  userInfo: null, //남의정보
  signUpData: {
    id: "",
    nick: "",
    password: "",
  },
};

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
  };
};

export const signUpAction = (data) => {
  return {
    type: "SIGN_UP_REQUEST",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("reducer logIn");
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: "",
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "지해짱" },
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        logInErrorReason: action.error,
        me: null,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
      };
    case "SIGN_UP_REQUEST":
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: "",
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
      };
    case "SIGN_UP_FAILURE":
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
