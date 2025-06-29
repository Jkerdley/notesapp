import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AuthStatusBar } from "../../../features";

export const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.menu}>
                <div className={styles.menuBar}>
                    <NavLink
                        className={styles.navLink}
                        to={"/"}
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none",
                        })}
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        className={styles.navLink}
                        to={"/notes"}
                        style={({ isActive }) => ({
                            textDecoration: isActive ? "underline" : "none",
                        })}
                    >
                        Заметки
                    </NavLink>
                </div>

                <AuthStatusBar />
            </div>
        </nav>
    );
};
