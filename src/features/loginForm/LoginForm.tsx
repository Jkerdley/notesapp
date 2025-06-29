import styles from "./loginForm.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks";
import { Button, Checkbox, Form, Input, message } from "antd";
import type { FormProps } from "antd";

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
};

export const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const [form] = Form.useForm();
    const from = location.state?.from || "/";

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        const { username, password } = values;

        if (username && password) {
            auth?.signIn({ username, password }, () => {
                navigate(from, { replace: true });
            });
        } else {
            message.error('Заполните поля формы "имя пользователя" и "пароль"');
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Ошибка валидации:", errorInfo);
        message.error("Пожалуйста, заполните все обязательные поля");
    };

    return (
        <div className={styles.loginPageContainer}>
            <Form
                form={form}
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    className={styles.formLabel}
                    label={<span className={styles.formLabel}>Имя</span>}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: (
                                <span className={styles.validationMessage}>
                                    Пожалуйста, введите имя пользователя!
                                </span>
                            ),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label={<span className={styles.formLabel}>Пароль</span>}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: (
                                <span className={styles.validationMessage}>Пожалуйста, введите пароль!</span>
                            ),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox className={styles.checkboxLabel}>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className={styles.customGreenBtn} type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
