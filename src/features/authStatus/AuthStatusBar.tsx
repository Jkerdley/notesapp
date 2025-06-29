import { useNavigate } from "react-router-dom";
import styles from "./authStatus.module.css";
import { useAuth } from "../../shared/hooks/useAuth";
import { Avatar, Button } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";

export const AuthStatusBar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLogout = () => {
        auth?.signOut(() => navigate("/"));
    };
    if (auth?.user === null) return <div className={styles.auth}>You are not logged in</div>;
    return (
        <div className={styles.auth}>
            <div className={styles.authPerson}>
                <p>Hi, {auth?.user.username}</p>
                <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
            </div>
            <Button
                className={styles.customGreenBtn}
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={handleLogout}
            >
                Выйти из аккаунта
            </Button>
        </div>
    );
};
