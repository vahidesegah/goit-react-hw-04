import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.container}>
      <button type="button" className={css.LoadMoreBtn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
