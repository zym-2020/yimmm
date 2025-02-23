/**
 * @author        yimmm <1161384816@qq.com>
 * @date          2025-02-18 22:37:09
 * Copyright © YourCompanyName All rights reserved
 */
import { Navigate, useNavigate } from "react-router";
import { IRegisterFormReq } from "@/interface";
import { InputNumber, Col, Row, Button } from "antd";
import "./index.less";
import { useEffect, useRef, useState } from "react";
import { validateAccount } from "@/request";
import { openMessage } from "@/utils/common";
import _ from "lodash";

const ValidateAccount = () => {
  const userJsonString = decodeURIComponent(
    document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("user="))
      ?.substring(6) ?? ""
  );
  if (userJsonString) {
    const user: IRegisterFormReq = JSON.parse(userJsonString);
    return (
      <div className="validate-account">
        <div>{`验证码已发至${user.account}`}</div>
        <InputPane />
      </div>
    );
  }
  return <Navigate to="/" />;
};

const InputPane = () => {
  const navigate = useNavigate();
  const [btnDisabledStatus, setBtnDisabledStatus] = useState(true);
  const [codeValues, setCodeValues] = useState<Array<null | number>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const arr = codeValues.filter((item) => item === null);
    if (arr.length === 0) {
      setBtnDisabledStatus(false);
      return;
    }
    setBtnDisabledStatus(true);
  }, [codeValues]);

  return (
    <div className="input-pane">
      <Row gutter={20}>
        {new Array(6).fill("").map((item, index) => {
          return (
            <Col span={4} key={index}>
              <InputNumber
                min={0}
                max={9}
                controls={false}
                value={codeValues[index]}
                ref={(el) => {
                  inputRefs.current.push(el);
                }}
                onKeyDown={(e) => {
                  const text = "0123456789";
                  if (text.includes(e.key)) {
                    const newCodeValues = _.cloneDeep(codeValues);
                    newCodeValues[index] = parseInt(e.key);
                    setCodeValues(newCodeValues);
                    inputRefs.current[index + 1]?.focus();
                  }
                  if (e.key === "Backspace") {
                    const newCodeValues = _.cloneDeep(codeValues);
                    newCodeValues[index] = null;
                    setCodeValues(newCodeValues);
                  }
                  e.preventDefault();
                }}
              />
            </Col>
          );
        })}
      </Row>
      <Row justify="end" className="validate-btn">
        <Col>
          <Button
            type="primary"
            disabled={btnDisabledStatus}
            onClick={async () => {
              const strArr = codeValues.map((item) => item?.toString() ?? "");
              const code = "".concat(...strArr);
              await validateAccount(code);
              openMessage("验证成功！", "success");

              navigate("/login");
            }}>
            验证
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ValidateAccount;
