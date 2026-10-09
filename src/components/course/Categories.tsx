import Image from "next/image";
import { GraduationCapIcon, ModuleBrainIcon, ModulePulseIcon, UsersIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Category } from "@/data/course";
import type { CategoriesContent } from "@/data/coursePage";
import styles from "./Categories.module.css";

function CategoryIcon({ icon }: { icon: Category["icon"] }) {
  if (icon.kind === "cap") return <GraduationCapIcon className={styles.glyph} />;
  if (icon.kind === "users") return <UsersIcon width={42} height={42} className={styles.glyph} />;
  if (icon.kind === "brain") return <ModuleBrainIcon width={42} height={42} className={styles.glyph} />;
  if (icon.kind === "pulse") return <ModulePulseIcon width={42} height={42} className={styles.glyph} />;
  return <Image src={icon.src} alt="" width={42} height={32} className={styles.flag} />;
}

/** Category links; hover and focus wash the card lime as drawn in Paper. */
export function Categories({ content: categories }: { content: CategoriesContent }) {
  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <div className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel tone="warm" size="sm">{categories.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="categories-title" align="start">
              {categories.heading}
            </SectionHeading>
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className={styles.grid} stagger={0.05}>
          {categories.items.map((item) => (
            <RevealItem as="li" key={item.id}>
              <a href={item.href} className={styles.card}>
                <span className={styles.icon}>
                  <CategoryIcon icon={item.icon} />
                </span>
                <span className={styles.title}>{item.title}</span>
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
