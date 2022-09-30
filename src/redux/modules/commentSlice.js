import { createSlice } from "@reduxjs/toolkit";
import {__getComment, __createComment} from '../async/asyncComment';


const initialState = {
    commentList:[], //댓글데이터
    createComment: false,  //작성상태
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers:{
        loadList: (state, action) => {
            state.commentList = action.payload;
        },
        lodingComment(state) {
            state.isLoding = true;
        },

    },
    extraReducers: (builder) => {
        // 댓글불러오기
        builder.addCase(__getComment.fulfilled, (state, actions) => {
          state.commentList = actions.payload;
    
          
        });
        builder.addCase(__getComment.rejected, (state, actions) => {
          alert("작성실패");
        });
        //댓글작성
        builder.addCase(__createComment.fulfilled, (state, actions) => {
            state.createComment = true;
      
            alert("작성완료");
          });
          builder.addCase(__createComment.rejected, (state, actions) => {
            alert("작성실패");
          });

      
    }
});

export const { loadList } =
  commentSlice.actions;
export default commentSlice.reducer;