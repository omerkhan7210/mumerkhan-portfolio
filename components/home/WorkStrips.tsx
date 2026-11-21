'use client';

import Link from 'next/link';
import { useState } from 'react';
import { STRIPS, ALL_STRIPS, type Filter, type Strip } from './data';
import Reveal from './Reveal';

const ALL_COUNT = ALL_STRIPS.length;
const FILTERS: Filter[] = ['All', 'Websites', 'E-commerce', 'Apps & automation', 'Trades'];

/* One strip per project: its real screens at one height, the last cut by the edge. */
export default function WorkStrips({ items = STRIPS, title = 'Selected work', headingLevel = 'h2', showAllLink = true }: { items?: Strip[]; title?: string; headingLevel?: 'h1' | 'h2'; showAllLink?: boolean } = {}) {
  const [filter, setFilter] = useState<Filter>('All');
  const [hover, setHover] = useState<string | null>(null);
  const list = items.filter((s) => filter === 'All' || s.tags.includes(filter));

  return (
    <section id="work" aria-labelledby="work-title" className="pt-28 md:pt-44 pb-10">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[minmax(180px,13%)_1fr] gap-8 lg:gap-10">
        <div className="min-w-0 lg:sticky lg:top-28 self-start flex flex-col lg:block gap-3">
          {headingLevel === 'h1' ? (
            <h1 id="work-title" className="text-[28px] font-medium text-bone leading-tight">{title}</h1>
          ) : (
            <h2 id="work-title" className="text-[28px] font-medium text-bone leading-tight">{title}</h2>
          )}
          <div className="min-w-0 lg:mt-6 flex lg:flex-col gap-x-4 gap-y-1.5 overflow-x-auto hide-scrollbar" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className="whitespace-nowrap text-left text-[15px] py-1 transition-colors hover:text-bone"
                style={{ color: filter === f ? 'var(--ink)' : 'var(--muted)', fontWeight: filter === f ? 500 : 400 }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className="min-w-0 grid grid-cols-1 gap-11">
          {list.map((s) => (
            <Reveal
              as="li"
              key={s.slug}
              onMouseEnter={() => setHover(s.slug)}
              onMouseLeave={() => setHover(null)}
              className="transition-opacity duration-500"
              style={{ opacity: hover && hover !== s.slug ? 0.4 : 1 }}
            >
              <Link href={`/work/${s.slug}`} className="group block" aria-label={`${s.title} case study`}>
                <div className="flex gap-2 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory hide-scrollbar h-[130px] md:h-[240px]">
                  {s.images.map((img, i) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={i === 0 ? `${s.title}: ${s.category}` : ''}
                      width={img.w}
                      height={img.h}
                      loading="lazy"
                      className="h-full w-auto max-w-none flex-none snap-start transition-transform duration-700 group-hover:scale-[1.015]"
                      style={{ filter: 'brightness(0.92)' }}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1.4fr_auto] gap-4 text-[15px]">
                  <span className="text-bone font-medium group-hover:text-jade transition-colors">{s.title}</span>
                  <span className="hidden md:block truncate" style={{ color: 'var(--muted)' }}>{s.category}</span>
                  <span className="tabular-nums" style={{ color: 'var(--muted)' }}>{s.year}</span>
                </div>
                <p className="mt-1 text-[16px] max-w-[70ch]" style={{ color: '#C4C7BF' }}>{s.result}</p>
              </Link>
            </Reveal>
          ))}
          {showAllLink && (
            <li>
              <Link href="/work" className="btn-outline">All {ALL_COUNT} case studies</Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
