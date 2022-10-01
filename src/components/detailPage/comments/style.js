import styled from "styled-components";

// export const Time = styled.p`
// font-size: 17px;
// // display:block;
// `;
export const Text = styled.p`
width: 100%;
height: 100%;
font-family:inherit;
font-size: ${(props)=>props.theme.margin.xlarge};
`;


export const CommentBox = styled.div`
  margin-bottom: 10px;
  border-radius: 10px;
  border:1px solid ${(props) => props.theme.color.darkgray};
  width: 100%;
  height: 20%;
  display:flex;
`;

export const UserBox = styled.div`
  width: 20%;
  height: 100%;
  border:1px solid red;
  border-radius: 10px;
`;

export const Comment = styled.div`
width: 65%;
height: 100%;
font-size: ${(props)=>props.theme.margin.xlarge};
`;

export const Time = styled.div`
  width: 15%;
  height: 100%;
  border:1px solid ${(props) => props.theme.color.blue};
  border-radius: 10px;
  font-size: ${(props)=>props.theme.margin.xlarge};
  
`;

export const NoCommentBox = styled.div`
  width: 100%;
  height: 100%;
  border:1px solid blue;
  border-radius: 10px;
  padding: ${(props)=>props.theme.padding.xlarge};
  font-size: ${(props)=>props.theme.margin.xlarge};
`;