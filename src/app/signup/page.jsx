"use client";

import { useForm } from "react-hook-form";
import {
  useGetRecipientsList,
  usePostRecipientsImageUrl,
  usePostRecipientsList
} from "@/hooks/recipients";

const SignUpPage = () => {
  const { data } = useGetRecipientsList();
  const { mutate } = usePostRecipientsList();
  const {
    mutate: getImageUrl,
    isSuccess,
    data: imageUrlData
  } = usePostRecipientsImageUrl();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const handleCreateImageUrl = async (value) => {
    const formData = new FormData();
    formData.append("image", value.target.files[0]);
    getImageUrl(formData);
  };
  if (isSuccess) {
    setValue("backgroundImageURL", imageUrlData.data.url);
  }

  const onSubmit = (value) => {
    value.name = `${value.nickName}/${value.password}/${value.question}`;

    const newValue = { ...value, ...{ team: "2-3" } };

    console.log(newValue);
    mutate(newValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="nickName">닉네임</label>
        <input
          id="nickName"
          type="text"
          {...register("nickName", {
            required: "닉네임을 입력하세요",
            validate: (value) =>
              data.results.some((user) => user.name.split("/")[0] === value)
                ? "이미 사용중인 닉네임입니다"
                : true
          })}
        />
        {errors.nickName && <span>{errors.nickName.message}</span>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="text"
          {...register("password", { required: "비밀번호를 입력하세요" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <label htmlFor="category">분야</label>
        <select id="category" {...register("backgroundColor")}>
          <option value="">선택</option>
          <option value="beige">학문</option>
          <option value="purple">게임</option>
          <option value="blue">연예</option>
          <option value="green">기타</option>
        </select>
      </div>
      <div>
        <label htmlFor="question">질문 내용</label>
        <textarea
          id="question"
          type="text"
          {...register("question", { required: "질문을 입력하세요" })}
        />
        {errors.question && <span>{errors.question.message}</span>}
      </div>
      <div>
        <label htmlFor="backgroundImageSelect">사진 첨부</label>
        <input
          id="backgroundImageSelect"
          type="file"
          {...register("backgroundImageSelect", {
            onChange: (value) => handleCreateImageUrl(value)
          })}
        />
      </div>
      <button type="submit">질문하기</button>
    </form>
  );
};

export default SignUpPage;
