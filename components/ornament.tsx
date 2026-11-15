export function Ornament() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="w-1.5 h-1.5 bg-muted-foreground rotate-45 flex-shrink-0" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
