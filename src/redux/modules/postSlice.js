import { createSlice, current } from "@reduxjs/toolkit";
import {
  __createPost,
  __editPost,
  __getPost,
  __likePost,
  __likeDelete,
  __getPostLocation,
} from "../async/asyncPost";

const initialState = {
  update: true, // 무한스크롤 통신 억제기
  page: 0, // 무한스크롤 페이지
  data: [], // 전체데이터
  location: [], // 지도페이지용 데이터
  loading: false, //로딩 상태 관리
  count: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    incrementPage(state) {
      state.page++;
    },
    updateFalse(state) {
      state.update = false;
    },
    updateTrue(state) {
      state.update = true;
    },
    initCreatePost(state) {
      state.createPost = false;
    },
    myHeartFalse(state, action) {
      state.data = state.data.map((item) =>
        item.postId === action.payload
          ? { ...item, myHeart: false, heart: item.heart - 1 }
          : item
      );
      state.location = state.location.map((item) =>
        item.postId === action.payload
          ? { ...item, myHeart: false, heart: item.heart - 1 }
          : item
      );
    },
    myHeartTrue(state, action) {
      state.data = state.data.map((item) =>
        item.postId === action.payload
          ? { ...item, myHeart: true, heart: item.heart + 1 }
          : item
      );
      state.location = state.location.map((item) =>
        item.postId === action.payload
          ? { ...item, myHeart: true, heart: item.heart + 1 }
          : item
      );
    },
  },
  extraReducers: (builder) => {
    // 게시물 작성
    builder.addCase(__createPost.pending, (state, payload) => {
      state.loading = true;
    });
    builder.addCase(__createPost.fulfilled, (state, actions) => {
      state.loading = false;
      state.data.unshift(actions.payload.data);
      alert("작성완료");
    });
    builder.addCase(__createPost.rejected, (state, actions) => {
      state.loading = false;
      alert("작성실패");
    });
    // 게시물 수정
    builder.addCase(__editPost.pending, (state, payload) => {
      state.loading = true;
    });
    builder.addCase(__editPost.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = state.data.map((e) =>
        e.postId === actions.payload.postId ? { ...e, ...actions.payload } : e
      );
      alert("수정완료");
    });

    // 게시물 좋아요
    builder.addCase(__likePost.fulfilled, (state, actions) => {
      alert("좋아요완료");
    });
    builder.addCase(__likePost.rejected, (state, actions) => {
      alert("좋아요실패");
    });

    // 게시물 좋아요취소
    builder.addCase(__likeDelete.fulfilled, (state, actions) => {
      alert("좋아요취소완료");
    });
    builder.addCase(__likeDelete.rejected, (state, actions) => {
      alert("좋아요취소실패");
    });

    builder.addCase(__editPost.rejected, (state, actions) => {
      state.loading = false;
      alert("수정실패");
    });
    // 전체 게시물 조회
    builder.addCase(__getPost.fulfilled, (state, actions) => {
      const payloadContent = actions.payload.content;
      state.data = [...state.data, ...payloadContent];
      state.update = false;
    });
    builder.addCase(__getPost.rejected, (state, actions) => {
      alert("게시물 불러오기 실패 새로고침 해보세요.");
    });
    // 좌표기준 게시물 조회
    builder.addCase(__getPostLocation.fulfilled, (state, actions) => {
      state.location = actions.payload;
      // console.log(state);
    });
    builder.addCase(__getPostLocation.rejected, (state, actions) => {
      alert("게시물 불러오기 실패 새로고침 해보세요.");
    });
  },
});

export const {
  incrementPage,
  updateTrue,
  updateFalse,
  initCreatePost,
  myHeartTrue,
  myHeartFalse,
} = postSlice.actions;
export default postSlice.reducer;
