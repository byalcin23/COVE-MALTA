---
name: apple-3d-scroll-aesthetics
description: Standards and guidelines for building Apple-grade 3D Matrix scroll transforms, spatial parallax motion, and luxury web aesthetics.
---

# Apple 3D Scroll Aesthetics & Motion Guardrails

This skill documents design patterns, 3D perspective transforms, and scroll-driven animation principles used in Apple flagship product showcase pages (e.g., iPhone 17 Pro, Mac Studio).

## 1. 3D Perspective & Matrix Motion Controls

- **CSS Perspective Container**:
  - Always wrap 3D elements in a container with `perspective: 1000px` or `perspective: 1200px` and `perspective-origin: center`.
- **Dynamic 3D Matrix Transform**:
  - Interpolate scroll ratio `t` (0 to 1) into subtle 3D rotational angles:
    - `rotateX(clamp(-12deg, (0.5 - t) * 24deg, 12deg))`
    - `rotateY(clamp(-8deg, (t - 0.5) * 16deg, 8deg))`
    - `translate3d(0, (0.5 - t) * 30px, (t - 0.5) * 40px)`
    - `scale(0.96 + t * 0.08)`
  - Use smooth spring lerp (`transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)`) for buttery 60FPS responses.

## 2. High-Legibility Glassmorphism Cards

- Use `backdrop-filter: blur(24px)` with high-contrast typography (`color: var(--text-warm)` / `color: var(--text-ivory)`).
- Ensure body text color contrast ratios exceed 4.5:1 against light and dark frosted backgrounds.

## 3. Interactive Component Contracts

- All card action buttons (`View Dossier`, `Try In Live Search`, `Saved`) must have working event handlers attached directly to parent component state modals.
