import Button from "../atoms/Button";

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="secondary" disabled={page <= 1} onClick={onPrev}>
        Anterior
      </Button>
      <p className="text-sm text-slate-600">
        Página <span className="font-semibold text-slate-900">{page}</span> / {totalPages}
      </p>
      <Button variant="secondary" disabled={page >= totalPages} onClick={onNext}>
        Siguiente
      </Button>
    </div>
  );
}

