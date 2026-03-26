import { useState, useEffect, useRef } from 'react';
import styles from './CommandPalette.module.css';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';

type ItemType = 'page' | 'project' | 'skill';

interface SearchItem {
	type:  ItemType;
	icon:  string;
	label: string;
	sub:   string;
	url:   string;
}

const PAGES: SearchItem[] = [
	{ type: 'page', icon: '⌂', label: 'Home',       sub: 'Back to start',           url: '/'           },
	{ type: 'page', icon: '◉', label: 'About',      sub: 'Background & education',  url: '/about'      },
	{ type: 'page', icon: '◈', label: 'Skills',     sub: 'Technical stack',         url: '/skills'     },
	{ type: 'page', icon: '◆', label: 'Projects',   sub: 'Work & side projects',    url: '/projects'   },
	{ type: 'page', icon: '◎', label: 'Experience', sub: 'Work history & certs',    url: '/experience' },
	{ type: 'page', icon: '✦', label: 'Blog',       sub: 'Writing & tutorials',     url: '/blog'       },
	{ type: 'page', icon: '✦', label: 'Contact',    sub: 'Get in touch',            url: '/contact'    },
];

const PROJECT_ITEMS: SearchItem[] = projects.map(p => ({
	type:  'project' as const,
	icon:  '◆',
	label: p.title,
	sub:   p.category.replace('-', ' '),
	url:   '/projects',
}));

const SKILL_ITEMS: SearchItem[] = skillCategories.flatMap(cat =>
	cat.skills.map(s => ({
		type:  'skill' as const,
		icon:  cat.icon,
		label: s.name,
		sub:   cat.title,
		url:   '/skills',
	}))
);

const ALL: SearchItem[] = [...PAGES, ...PROJECT_ITEMS, ...SKILL_ITEMS];

function matches(item: SearchItem, q: string): boolean {
	const lower = q.toLowerCase();
	return (
		item.label.toLowerCase().includes(lower) ||
		item.sub.toLowerCase().includes(lower)   ||
		item.type.includes(lower)
	);
}

async function goTo(url: string) {
	try {
		const { navigate } = await import('astro:transitions/client');
		navigate(url);
	} catch {
		window.location.href = url;
	}
}

export default function CommandPalette() {
	const [open,   setOpen]   = useState(false);
	const [query,  setQuery]  = useState('');
	const [active, setActive] = useState(0);
	const inputRef  = useRef<HTMLInputElement>(null);
	const activeRef = useRef<HTMLLIElement>(null);

	const results   = query.trim() ? ALL.filter(i => matches(i, query)) : PAGES;
	const safeActive = Math.min(active, Math.max(0, results.length - 1));

	/* ── open / close helpers ──────────────────────────────── */
	function open_() { setOpen(true);  setQuery(''); setActive(0); }
	function close_() { setOpen(false); }

	/* ── Ctrl/Cmd + K ──────────────────────────────────────── */
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				setOpen(prev => { if (!prev) { setQuery(''); setActive(0); } return !prev; });
			}
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	/* ── navbar trigger button ─────────────────────────────── */
	useEffect(() => {
		window.addEventListener('cp:open', open_);
		return () => window.removeEventListener('cp:open', open_);
	}, []);

	/* ── focus input when opened ───────────────────────────── */
	useEffect(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 30);
	}, [open]);

	/* ── reset active on query change ─────────────────────── */
	useEffect(() => { setActive(0); }, [query]);

	/* ── scroll active item into view ─────────────────────── */
	useEffect(() => { activeRef.current?.scrollIntoView({ block: 'nearest' }); }, [safeActive]);

	/* ── keyboard inside the modal ─────────────────────────── */
	function onKeyDown(e: React.KeyboardEvent) {
		if      (e.key === 'Escape')    close_();
		else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
		else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
		else if (e.key === 'Enter') {
			const item = results[safeActive];
			if (item) { close_(); goTo(item.url); }
		}
	}

	function select(item: SearchItem) { close_(); goTo(item.url); }

	if (!open) return null;

	return (
		<div className={styles.overlay} onClick={close_} role="presentation">
			<div
				className={styles.modal}
				role="dialog"
				aria-modal="true"
				aria-label="Command palette"
				onClick={e => e.stopPropagation()}
				onKeyDown={onKeyDown}
			>
				{/* ── search row ── */}
				<div className={styles.searchRow}>
					<span className={styles.prompt} aria-hidden="true">$</span>
					<input
						ref={inputRef}
						className={styles.input}
						type="text"
						placeholder="search pages, projects, skills..."
						value={query}
						onChange={e => setQuery(e.target.value)}
						aria-label="Command palette search"
						aria-autocomplete="list"
						aria-controls="cp-list"
						aria-activedescendant={results[safeActive] ? `cp-item-${safeActive}` : undefined}
					/>
					<kbd className={styles.escHint} onClick={close_} title="Close">esc</kbd>
				</div>

				<div className={styles.divider} />

				{/* ── results ── */}
				<ul id="cp-list" className={styles.list} role="listbox" aria-label="Search results">
					{results.length === 0 ? (
						<li className={styles.empty}>no matches for "{query}"</li>
					) : (
						results.map((item, i) => (
							<li
								key={`${item.type}-${item.label}`}
								id={`cp-item-${i}`}
								ref={i === safeActive ? activeRef : null}
								className={`${styles.item} ${i === safeActive ? styles.itemActive : ''}`}
								role="option"
								aria-selected={i === safeActive}
								onClick={() => select(item)}
								onMouseEnter={() => setActive(i)}
							>
								<span className={styles.itemIcon} aria-hidden="true">{item.icon}</span>
								<span className={styles.itemBody}>
									<span className={styles.itemLabel}>{item.label}</span>
									<span className={styles.itemSub}>{item.sub}</span>
								</span>
								<span className={`${styles.badge} ${styles[`badge_${item.type}` as keyof typeof styles]}`}>
									{item.type}
								</span>
							</li>
						))
					)}
				</ul>

				{/* ── footer hints ── */}
				<div className={styles.footer} aria-hidden="true">
					<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
					<span><kbd>↵</kbd> open</span>
					<span><kbd>esc</kbd> close</span>
				</div>
			</div>
		</div>
	);
}
