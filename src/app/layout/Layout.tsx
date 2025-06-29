import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { NavBar } from "../../widgets";
export const Layout = () => {
    return (
        <main className={styles.mainLayout}>
            <header>
                <NavBar />
            </header>
            <section className={styles.mainContent}>
                <Outlet />
            </section>
        </main>
    );
};
