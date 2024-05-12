// import React from "react";
// import { login } from "../apis/auth";
// import { Button, Checkbox, Form, Input } from "antd";
// import { useNavigate } from "react-router-dom";
// import { message } from "antd";
// import './Login.scss'
// import loginImg from '../../public/assets/images/Dar_logo.svg'

// const Login = () => {
//   const navigate = useNavigate();
//   const onFinish = async (values) => {
//     const res = await login(values);
//     console.log(res);
//     if (!(res instanceof Error)) {
//       values.remember
//         ? localStorage.setItem("token", res.data.data.token)
//         : sessionStorage.setItem("token", res.data.data.token);
//       navigate("/warehouse");
//     } else {
//       message.error(res.response.data.error.message);
//     }
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <div className="login-page-wrapper">

//       <div className="login-container">
//         <div className="login-form-wrapper">
//           <Form
//             // className="login-form"
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 16,
//             }}
//             style={{
//               maxWidth: 600,
//             }}
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//           >
//             <Form.Item
//               label="إسم المستخدم"
//               name="username"
//               rules={[
//                 {
//                   required: true,
//                   message: "من فضلك أدخل إسم المستخدم",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="كلمة المرور"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "من فضلك أدخل كلمة المرور",
//                 },
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>

//             <Form.Item
//               name="remember"
//               valuePropName="checked"
//               wrapperCol={{
//                 offset: 8,
//                 span: 16,
//               }}
//             >
//               <Checkbox>تذكرنى</Checkbox>
//             </Form.Item>

//             <Form.Item
//               wrapperCol={{
//                 offset: 8,
//                 span: 16,
//               }}
//             >
//               <Button type="primary" htmlType="submit">
//                 تسجيل الدخول
//               </Button>
//             </Form.Item>
//           </Form>

//           {/* <div className="login-img"> */}
//           {/* <img src={loginImg} alt="logo" /> */}
//           {/* <img src="../../public/assets/images/solidierImg.png" alt="logo" /> */}
//           {/* </div> */}
//           <div className="login-image">
//             <img src="../../public/assets/images/solidierImg.png" alt="logo" />
//           </div>


//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;


import React from "react";
import { login } from "../apis/auth";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import './Login.scss';
import loginImg from '../../public/assets/images/Dar_logo.svg';
import soldierImg from '../../public/assets/images/solidierImg.png';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await login(values);
      console.log(res);
      const token = res.data.data.token;

      if (values.remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      navigate("/warehouse");
    } catch (error) {
      message.error(error.response.data.error.message);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-form-wrapper">
          <Form
            className="login-form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 400 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div style={{ marginBottom: 20, width: '100%' }}>
              <label style={{ display: 'block', color: '#803D3B', fontSize: "16px", fontWeight: "700", fontFamily: "Cairo" }}>إسم المستخدم</label>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "من فضلك أدخل إسم المستخدم" }]}
                style={{ width: '100%' }}
              >
                <Input style={{ borderRadius: 8, border: '1px solid #d9d9d9', paddingLeft: 10, width: '100%', fontFamily: "Cairo" }} />
              </Form.Item>
            </div>

            <div style={{ marginBottom: 20, width: '100%' }}>
              <label style={{ display: 'block', color: '#803D3B', fontSize: "16px", fontWeight: "700", fontFamily: "Cairo" }}>كلمة المرور</label>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "من فضلك أدخل كلمة المرور" }]}
                style={{ width: '100%' }}
              >
                <Input.Password style={{ borderRadius: 8, border: '1px solid #d9d9d9', paddingLeft: 10, width: '100%', fontFamily: "Cairo" }} />
              </Form.Item>
            </div>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              style={{ marginBottom: 20 }}
            >
              <Checkbox style={{ float: 'right' }}>تذكرنى</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" className="login-button" style={{ width: '100%', maxWidth: 400, fontFamily: "Cairo" }}>
                تسجيل الدخول
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="login-image">
          {/* <img src={soldierImg} alt="Soldier" /> */}
          {/* <img src="../../public/assets/images/dar_biege.svg" alt="" /> */}
          {/* <img src="../../public/assets/images/dar_light_biege.svg" alt="" /> */}
          {/* <img src="../../public/assets/images/dar_brown.svg" alt="" /> */}
          <img src="../../public/assets/images/dar_white.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
