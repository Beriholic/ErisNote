"use client";
import { api } from "@/api/ApiInstance";
import { Button, Icon, IconButton, TextField } from "actify";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordShowToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    const res = await api.userController.login({
      body: {
        username: username,
        password: password,
      },
    });

    if (res.code !== 200) {
      alert("登陆失败");
      console.log(res.msg);
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-surface-variant  rounded-2xl border-2 border-surface-dim shadow-lg p-20">
        <h1 className="text-3xl text-center">登陆到 ErisNote</h1>

        <div className="flex flex-col gap-4 p-20">
          <TextField
            label="用户名"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            <TextField.LeadingIcon>
              <Icon>Account_Circle</Icon>
            </TextField.LeadingIcon>
          </TextField>
          <TextField
            label="密码"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
          >
            <TextField.LeadingIcon>
              <Icon>lock</Icon>
            </TextField.LeadingIcon>
            <TextField.TrailingIcon>
              <IconButton onClick={passwordShowToggle}>
                <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
              </IconButton>
            </TextField.TrailingIcon>
          </TextField>
        </div>

        <div className="flex flex-row items-center justify-center gap-8">
          <Button onClick={handleLogin}>登陆</Button>
          <Button
            onClick={() => {
              router.push("/register");
            }}
          >
            注册
          </Button>
        </div>
      </div>
    </div>
  );
}
