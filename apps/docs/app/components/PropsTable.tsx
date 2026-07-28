import propsTables from '../../.generated/props-tables.json';

interface PropEntry {
  type: string;
  required: boolean;
  defaultValue: string | null;
  description: string | null;
}

interface ComponentDoc {
  props: Record<string, PropEntry>;
  description: string | null;
  extendsDomProps?: boolean;
}

const table = propsTables as Record<string, ComponentDoc>;

/**
 * Renders a component's props table from apps/docs/.generated/props-tables.json
 * — CLAUDE.md's hard rule "Props tables in docs are auto-generated from
 * TypeScript — never hand-written". Regenerate that file via
 * `node scripts/generate-props-tables.mjs` (wired into `predev`/`prebuild`);
 * never hand-edit it.
 */
export function PropsTable({ component }: { component: string }) {
  const doc = table[component];

  if (!doc) {
    return (
      <p role="alert">
        No generated props found for <code>{component}</code>. Run{' '}
        <code>node scripts/generate-props-tables.mjs</code> from <code>apps/docs</code>.
      </p>
    );
  }

  const entries = Object.entries(doc.props);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([name, prop]) => (
            <tr key={name}>
              <td>
                <code>
                  {name}
                  {prop.required ? '' : '?'}
                </code>
              </td>
              <td>
                <code>{prop.type}</code>
              </td>
              <td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : '—'}</td>
              <td>{prop.description ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {doc.extendsDomProps ? (
        <p>
          <em>
            Also forwards all standard DOM element props (<code>className</code>, <code>style</code>, event
            handlers, <code>aria-*</code>, <code>data-*</code>, ...) for whichever element it renders.
          </em>
        </p>
      ) : null}
    </div>
  );
}
