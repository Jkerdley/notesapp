import { Button } from "antd";
import styles from "./mainPage.module.css";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.notePageContainer}>
        <h1>Welcome to NOTEX</h1>
        <p>Создавайте заметки в формате Markdown <br /> и храните их на Вашем ПК</p>
      <div className={styles.notePageButtons}>
        <Button color="cyan" variant="solid" onClick={() => navigate("/notes")}>
          Посмотреть все заметки
        </Button>
      </div>
    </section>
  );
};
