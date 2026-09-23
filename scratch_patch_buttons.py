import os
import re

css_replacement = """.btn {
  display: inline-flex; align-items: center; justify-content: center;
  white-space: nowrap; border-radius: calc(var(--radius) - 2px);
  font-size: 0.875rem; font-weight: 500; height: 2.5rem; padding: 0.5rem 1rem;
  transition: all 0.15s; cursor: pointer; text-decoration: none;
  
  /* Available: colour border */
  background-color: transparent; 
  border: 1px solid hsl(var(--primary)); 
  color: hsl(var(--primary));
}
.btn:hover { background-color: hsl(var(--primary) / 0.1); }

/* Available Variant: Secondary */
.btn.btn-secondary {
  border: 1px solid hsl(var(--secondary-foreground) / 0.5);
  color: hsl(var(--foreground));
}
.btn.btn-secondary:hover {
  background-color: hsl(var(--secondary-foreground) / 0.1);
}

/* Active: full colour and border */
.btn.btn-primary, .btn.active { 
  background-color: hsl(var(--primary)); 
  color: hsl(var(--primary-foreground)); 
  border: 1px solid hsl(var(--primary)); 
  font-weight: 700; 
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4); 
}
.btn.btn-primary:hover, .btn.active:hover { 
  background-color: hsl(var(--primary) / 0.9); 
}

/* Danger Buttons (Solid) */
.btn.btn-danger { 
  background-color: hsl(var(--destructive)); 
  border: 1px solid hsl(var(--destructive));
  color: hsl(var(--destructive-foreground)); 
}
.btn.btn-danger:hover { 
  background-color: hsl(var(--destructive) / 0.9); 
}

/* Unavailable: no colour & no border */
.btn:disabled { 
  background-color: transparent !important; 
  border: 1px solid transparent !important; 
  color: hsl(var(--muted-foreground)) !important; 
  opacity: 0.6; 
  pointer-events: none; 
  cursor: not-allowed; 
  box-shadow: none !important; 
}"""

for file in ["admin.html", "remote.html"]:
    with open(file, "r") as f:
        html = f.read()

    # Find the block starting at `.btn {` and ending at the last `.btn:disabled` or `.btn-group`
    # We will use regex to replace it.
    pattern = re.compile(r'\.btn\s*\{.*?(?=\.btn-group)', re.DOTALL)
    
    if pattern.search(html):
        html = pattern.sub(css_replacement + '\n\n', html)
        with open(file, "w") as f:
            f.write(html)
        print(f"Patched {file}")
    else:
        print(f"Could not find .btn block in {file}")

