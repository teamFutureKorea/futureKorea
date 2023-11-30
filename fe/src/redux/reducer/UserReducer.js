/* 리덕스에서 관리 할 상태 정의 */
const init = {
  user:null
};

const UserReducer = (state = init, action)=>{
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload};
    default:
      return state;
  }
}
export default UserReducer;