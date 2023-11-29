/* 리덕스에서 관리 할 상태 정의 */
const init = {
  searchKeyword:""
};

const SearchReducer = (state = init, action)=>{
  switch (action.type) {
    case "searchKeyword":
      return { ...state, searchKeyword: action.payload};
    default:
      return state;
  }
}
export default SearchReducer;