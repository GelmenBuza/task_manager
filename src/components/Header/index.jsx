import style from "./style.module.css";

const Header = () => {
    return (
        <header className={style.header}>
                <ul>
                    <li>Мы</li>
                    <li>Вы</li>
                    <li>Они</li>
                    <li>Молодцы</li>
                    <li>Не вы</li>
                </ul>
        </header>
    )
}

export default Header;