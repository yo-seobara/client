import {
  ImageInputButton,
  InputBox,
  InputContainerWrapper,
  InputText,
  InputTextArea,
  Label,
  LabelBox,
  PhotoBox,
  SubmitButton,
} from "./style";
import useInput from "../../../hooks/useInput";
import { useEffect, useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import Slider from "../../global/slider";
import { useDispatch, useSelector } from "react-redux";
import { __createPost } from "../../../redux/async/asyncPost";
import { useNavigate } from "react-router-dom";

const InputContainer = ({ pick }) => {
  const [title, titleHandler] = useInput();
  const [content, contentHandler] = useInput();
  const [imageInput, setImageInput] = useState([]); // 미리보기용 이미지 리스트
  const [imageFile, setImageFile] = useState([]); // 서버 전송용 이미지 데이터
  const imageRef = useRef();
  const formData = new FormData();
  const IMAGE_LIMIT = 3;

  const postStatus = useSelector((state) => state.post); // 작성상태
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitData = {
    title: title,
    content: content,
    // images: [],
    location: {
      lat: pick.lat,
      lng: pick.lng,
    },
  };

  const addImage = (e) => {
    const selectedImageList = e.target.files; // 선택한 이미지들
    if (selectedImageList.length + imageInput.length >= IMAGE_LIMIT) {
      alert("사진은 최대 3장까지만 업로드 가능합니다");
      return;
    }
    const imageURLList = [...imageInput]; // 미리보기용 사진
    const imageFileList = [...imageFile]; // 서버로 보낼 사진
    for (let i = 0; i < selectedImageList.length; i++) {
      const imageURL = URL.createObjectURL(selectedImageList[i]);
      imageURLList.push(imageURL);
      imageFileList.push(selectedImageList[i]);
    }
    setImageInput(imageURLList);
    setImageFile(imageFileList);
  };

  const onSubmit = () => {
    if (title === "" || content === "") {
      alert("내용을 입력해주세요.");
      return;
    } else if (imageFile.length === 0) {
      alert("사진을 추가해주세요.");
      return;
    } else {
      formData.append(
        "postRequestDto",
        new Blob([JSON.stringify(submitData)], { type: "application/json" })
      );
      imageFile.forEach((e, idx) => {
        formData.append(`images`, e);
      });
      dispatch(__createPost(formData));
    }
  };

  useEffect(() => {
    if (postStatus.createPost) {
      navigate("/map");
    }
  }, [postStatus.createPost]);

  const imageUpload = () => {
    if (imageInput.length >= IMAGE_LIMIT) {
      alert("사진은 최대 3장까지만 업로드 가능합니다");
      return;
    }
    // 버튼클릭시 input태그에 클릭이벤트를 걸어준다.
    imageRef.current.click();
  };

  return (
    <>
      <InputContainerWrapper>
        <PhotoBox>
          <Slider imageList={imageInput} />
          <ImageInputButton onClick={imageUpload}>
            <MdAddPhotoAlternate size={"50%"}></MdAddPhotoAlternate>
            <span>사진추가</span>
          </ImageInputButton>
          <input
            type="file"
            multiple="multiple"
            accept="image"
            style={{ display: "none" }}
            ref={imageRef}
            onChange={addImage}
          />
        </PhotoBox>
        <InputBox>
          <LabelBox>
            <Label>제목</Label>
            <InputText
              type="text"
              name="title"
              placeholder="장소를 입력해주세요"
              onChange={titleHandler}
              value={title}
            />
          </LabelBox>
          <LabelBox>
            <Label>내용</Label>
            <InputTextArea
              type="content"
              name="content"
              placeholder="장소에 대한 설명을 입력해주세요."
              onChange={contentHandler}
              value={content}
            />
          </LabelBox>
        </InputBox>
      </InputContainerWrapper>
      <SubmitButton onClick={onSubmit}>제출</SubmitButton>
    </>
  );
};

export default InputContainer;
