/* Components */
import { Providers } from "@/lib/providers";

/* Instruments */
import styles from "./styles/layout.module.css";
import "./styles/globals.css";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={styles.container}>
            {/* TODO: Header Here */}

            <main className={styles.main}>{props.children}</main>

            {/* TODO: Footer here */}
          </section>
        </body>
      </html>
    </Providers>
  );
}
