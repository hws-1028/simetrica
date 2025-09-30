// src/hooks/useNavVisibility.ts
import { useEffect, useRef, useState } from 'react';

interface UseNavVisibilityOptions {
  offset?: number;     // Píxeles de scroll antes de activar el comportamiento
  threshold?: number;  // Mínimo de píxeles de diferencia para considerar scroll
}

/**
 * Hook personalizado para controlar visibilidad del navbar basado en dirección de scroll
 * 
 * CAMBIO IMPLEMENTADO: Hook optimizado con requestAnimationFrame para performance
 * - Detecta dirección de scroll (arriba/abajo)
 * - Oculta navbar al scroll hacia abajo después del offset
 * - Muestra navbar al scroll hacia arriba
 * - Usa requestAnimationFrame para mejor performance que throttling con setTimeout
 * 
 * @param options - Configuración del comportamiento
 * @returns visible - Boolean que indica si el navbar debe ser visible
 */
export function useNavVisibility({ 
  offset = 100, 
  threshold = 10 
}: UseNavVisibilityOptions = {}): boolean {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      
      ticking.current = true;
      
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
        
        // Solo procesar si el scroll supera el threshold (evita micro-movimientos)
        if (scrollDelta < threshold) {
          ticking.current = false;
          return;
        }

        // Lógica de visibilidad basada en dirección y posición
        if (currentScrollY > lastScrollY.current && currentScrollY > offset) {
          // Scroll hacia abajo y pasó el offset -> ocultar
          setVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scroll hacia arriba -> mostrar
          setVisible(true);
        }
        
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    // Listener optimizado con passive para mejor performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset, threshold]);

  return visible;
}