import { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// ── Generate 2 000 rows of fake employee data ────────────────────────────────
const DEPTS = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales', 'Legal', 'Product'];
const STATUSES = ['Active', 'On Leave', 'Remote', 'Contract'];

function generateRows(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    department: DEPTS[i % DEPTS.length],
    salary: 40000 + Math.floor(Math.random() * 80000),
    age: 22 + (i % 43),
    status: STATUSES[i % STATUSES.length],
    hireYear: 2000 + (i % 25),
    performance: (3 + Math.random() * 2).toFixed(1),
  }));
}

const ROW_DATA = generateRows(2000);

// ── Column definitions ────────────────────────────────────────────────────────
const COL_DEFS = [
  { field: 'id',          headerName: 'ID',          width: 80,  filter: 'agNumberColumnFilter' },
  { field: 'name',        headerName: 'Name',        flex: 1,    filter: 'agTextColumnFilter'   },
  { field: 'department',  headerName: 'Department',  flex: 1,    filter: 'agTextColumnFilter'   },
  {
    field: 'salary',
    headerName: 'Salary',
    flex: 1,
    filter: 'agNumberColumnFilter',
    valueFormatter: p => `$${p.value.toLocaleString()}`,
  },
  { field: 'age',         headerName: 'Age',         width: 80,  filter: 'agNumberColumnFilter' },
  { field: 'status',      headerName: 'Status',      flex: 1,    filter: 'agTextColumnFilter'   },
  { field: 'hireYear',    headerName: 'Hire Year',   width: 110, filter: 'agNumberColumnFilter' },
  {
    field: 'performance',
    headerName: 'Perf',
    width: 90,
    filter: 'agNumberColumnFilter',
    cellStyle: p => ({ color: p.value >= 4.5 ? 'green' : p.value < 3.5 ? 'red' : 'inherit' }),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AgGridDemo() {
  const gridRef = useRef(null);
  const [quickFilter, setQuickFilter] = useState('');
  const [rowCount, setRowCount] = useState(ROW_DATA.length);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  const onFilterChanged = useCallback(() => {
    const api = gridRef.current?.api;
    if (api) setRowCount(api.getDisplayedRowCount());
  }, []);

  const exportCsv = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({ fileName: 'employees.csv' });
  }, []);

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-1">AG Grid — Big Data Demo</h2>
      <p className="text-muted mb-3">
        2 000 rows rendered with virtual scrolling. Sorting, filtering, and CSV export are all
        built-in via <code>ag-grid-react</code> (Community edition).
      </p>

      {/* ── Toolbar ── */}
      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
        <input
          type="search"
          className="form-control form-control-sm"
          style={{ maxWidth: 260 }}
          placeholder="Quick filter…"
          value={quickFilter}
          onChange={e => setQuickFilter(e.target.value)}
        />
        <button className="btn btn-sm btn-outline-primary" onClick={exportCsv}>
          Export CSV
        </button>
        <span className="ms-auto text-muted small">
          Showing <strong>{rowCount}</strong> / {ROW_DATA.length} rows
        </span>
      </div>

      {/* ── Grid ── */}
      <div style={{ height: 520 }}>
        <AgGridReact
          ref={gridRef}
          rowData={ROW_DATA}
          columnDefs={COL_DEFS}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilter}
          onFilterChanged={onFilterChanged}
          pagination={false}
          rowBuffer={20}
          animateRows={true}
        />
      </div>

      {/* ── Feature callouts ── */}
      <div className="row g-3 mt-3">
        {[
          { icon: '⚡', title: 'Virtual Scroll', body: 'Only visible rows are rendered in the DOM — handles millions of rows without performance loss.' },
          { icon: '🔍', title: 'Column Filters', body: 'Click the funnel icon in any header to open a column-level filter (text, number, set).' },
          { icon: '↕️', title: 'Multi-Sort', body: 'Hold Shift and click multiple column headers to sort on more than one column at once.' },
          { icon: '📤', title: 'CSV Export', body: 'The Export CSV button calls the grid API to stream the current filtered data to a file.' },
        ].map(({ icon, title, body }) => (
          <div className="col-sm-6 col-lg-3" key={title}>
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <div className="fs-3 mb-1">{icon}</div>
                <h6 className="card-title">{title}</h6>
                <p className="card-text small text-muted mb-0">{body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
