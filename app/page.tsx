import Image from "next/image";
import Search from "./components/Search";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>
          W<span className={styles.innerTitle}>
          IKIPEDI</span>A
        </p>
        <p className={styles.subTitle}>
          The Free Encyclopedia
        </p>
      </div>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/wikipedia-logo.png"
          alt="Wikipedia Logo"
          layout='fill'
          objectFit='contain'
          priority
        />
      </div>
      <div className={styles.searchContainer}>
        <Search />
      </div>
    </main>
  );
}
