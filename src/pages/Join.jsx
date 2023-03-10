import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logManagerIn } from "apollo";
import Button from "components/Button";
import path from "router/path";
import Container from "components/Container";
import { Caption, LogoTitle, SubTitle } from "components/Heading";
import Card from "components/Card";
import Input from "components/Input";
import HelperText from "components/HelperText";
import Form from "components/Form";
import HeaderBar from "components/Header";
import StyledLink from "components/StyledLink";
import Divider from "components/Divider";
import LogoText from "components/LogoText";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px;
`;

const CREATE_MANAGER = gql`
  mutation CreateManager(
    $username: String!
    $password: String!
    $name: String!
    $phone: String!
    $storeName: String!
    $storeNumber: String!
    $storeAddress: String!
    $email: String
  ) {
    createManager(
      username: $username
      password: $password
      name: $name
      phone: $phone
      storeName: $storeName
      storeNumber: $storeNumber
      storeAddress: $storeAddress
      email: $email
    ) {
      ok
      error
    }
  }
`;

function Join(props) {
  const navigator = useNavigate();
  const [createManager, { loading }] = useMutation(CREATE_MANAGER);

  const {
    handleSubmit,
    register,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm();

  const handlers = {
    clearLoginError: () => {
      clearErrors("result");
    },
    onSubmit: (data) => {
      createManager({
        variables: data,
      })
        .then(({ data }) => {
          if (!data?.createManager?.ok)
            return setError("result", { message: data?.createManager?.error });
          const { username, password } = getValues();
          navigator(path.login, {
            state: {
              message: "???????????? ??????, ????????? ????????????",
              username,
              password,
            },
          });
        })
        .catch((err) =>
          setError("result", { message: "?????? ?????? (1~2??? ??? ?????????)" })
        );
    },
  };

  return (
    <Container>
      <HeaderBar />
      <ContentWrapper>
        <Card>
          <LogoText />
          <SubTitle>?????? ????????? ?????? ???????????? ??????????????? ???????????????</SubTitle>

          <Form onSubmit={handleSubmit(handlers.onSubmit)}>
            <Divider label="?????? ??????" />
            {/* ????????? ?????? */}
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "????????? ????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"????????? ??????"}
              error={Boolean(errors?.name?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.name?.message}</HelperText>
            {/* ????????? ?????? */}
            <Input
              {...register("phone", {
                required: {
                  value: true,
                  message: "????????? ????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"????????? ??????"}
              error={Boolean(errors?.phone?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.phone?.message}</HelperText>
            {/* ????????? ?????? */}
            <Input
              {...register("email", {
                required: {
                  value: true,
                  message: "?????? ????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"?????? ??????"}
              error={Boolean(errors?.email?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.email?.message}</HelperText>

            <Divider label="????????? ??????" />

            {/* ???????????? */}
            <Input
              {...register("storeName", {
                required: {
                  value: true,
                  message: "??????????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"????????????"}
              error={Boolean(errors?.storeName?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.storeName?.message}</HelperText>
            {/* ????????? ????????? */}
            <Input
              {...register("storeNumber", {
                required: {
                  value: true,
                  message: "????????? ???????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"????????? ?????????"}
              error={Boolean(errors?.storeNumber?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.storeNumber?.message}</HelperText>
            {/* ????????? ?????? */}
            <Input
              {...register("storeAddress", {
                required: {
                  value: true,
                  message: "????????? ????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"????????? ?????? (????????? ??????)"}
              error={Boolean(errors?.storeAddress?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.storeAddress?.message}</HelperText>

            <Divider label="????????? ??????" />

            {/* ????????? ????????? */}
            <Input
              {...register("username", {
                required: {
                  value: true,
                  message: "????????? ???????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"????????? ?????????"}
              error={Boolean(errors?.username?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.username?.message}</HelperText>

            {/* ????????? ???????????? */}
            <Input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "????????? ??????????????? ?????? ?????? ?????????",
                },
              })}
              placeholder={"????????? ????????????"}
              error={Boolean(errors?.password?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.password?.message}</HelperText>

            {/* ???????????? ?????? */}
            <Input
              type="password"
              {...register("passwordCheck", {
                required: {
                  value: true,
                  message: "???????????? ????????? ?????? ?????? ?????????",
                },
                validate: (check) => {
                  const pw = getValues()?.password;
                  if (check !== pw) {
                    setError("passwordCheck", {
                      message: "??????????????? ???????????? ??????",
                    });
                    return false;
                  } else return true;
                },
              })}
              placeholder={"???????????? ??????"}
              error={Boolean(errors?.passwordCheck?.message)}
              onChange={handlers.clearLoginError}
            />
            <HelperText>{errors?.passwordCheck?.message}</HelperText>

            <HelperText>{errors?.result?.message}</HelperText>
            <Button type="submit" value="??????" disabled={loading} />
          </Form>
        </Card>
        <Card style={{ display: "flex", flexDirection: "row" }}>
          <Caption>????????? ????????????????</Caption>
          <Caption>
            <StyledLink to={path.login}>?????????</StyledLink>
          </Caption>
        </Card>
      </ContentWrapper>
    </Container>
  );
}

export default Join;
