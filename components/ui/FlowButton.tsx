'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FlowButtonVariant =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'white-red'
  | 'white-gray'
  | 'dark'
  | 'outline'
  | 'accent-outline'
  | 'ghost';

export type FlowButtonSize = 'sm' | 'md' | 'lg';

export interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: React.ReactNode;
  variant?: FlowButtonVariant;
  size?: FlowButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  showArrow?: boolean;
  arrowIcon?: React.ElementType;
  fullWidth?: boolean;
  className?: string;
}

export function FlowButton({
  text,
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  showArrow = true,
  arrowIcon: ArrowComponent = ArrowRight,
  fullWidth = false,
  className,
  disabled,
  type = 'button',
  ...props
}: FlowButtonProps) {
  const content = children || text || 'Button';

  // Base styling: isolated with group/flow, rounded-2xl initial, smooth hover:rounded-lg
  const baseClasses =
    'group/flow relative inline-flex items-center justify-center overflow-hidden rounded-2xl cursor-pointer select-none transition-all duration-1000 ease-flow-smooth hover:rounded-lg active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  // Size specifications with built-in responsive scaling and generous gap between text & arrows
  const sizeConfig = {
    sm: {
      padding: 'px-4 py-1.5 text-xs sm:px-6 sm:py-2 font-semibold',
      iconClass: 'w-3 h-3 sm:w-3.5 sm:h-3.5',
      leftArrow: '-left-8 sm:-left-10 group-hover/flow:left-2.5 sm:group-hover/flow:left-3.5',
      rightArrow: 'right-2.5 sm:right-3.5 group-hover/flow:-right-8 sm:group-hover/flow:-right-10',
      textShift: '-translate-x-2 sm:-translate-x-2.5 group-hover/flow:translate-x-2 sm:group-hover/flow:translate-x-2.5',
    },
    md: {
      padding: 'px-5 py-2 text-xs sm:px-7 sm:py-2.5 sm:text-sm lg:px-9 lg:py-3 font-semibold',
      iconClass: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
      leftArrow: '-left-10 sm:-left-12 group-hover/flow:left-3.5 sm:group-hover/flow:left-5',
      rightArrow: 'right-3.5 sm:right-5 group-hover/flow:-right-10 sm:group-hover/flow:-right-12',
      textShift: '-translate-x-2.5 sm:-translate-x-3.5 group-hover/flow:translate-x-2.5 sm:group-hover/flow:translate-x-3.5',
    },
    lg: {
      padding: 'px-5 py-2 text-xs sm:px-8 sm:py-2.5 sm:text-sm lg:px-11 lg:py-3.5 lg:text-base font-semibold',
      iconClass: 'w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5',
      leftArrow: '-left-10 sm:-left-12 lg:-left-14 group-hover/flow:left-3.5 sm:group-hover/flow:left-5 lg:group-hover/flow:left-6',
      rightArrow: 'right-3.5 sm:right-5 lg:right-6 group-hover/flow:-right-10 sm:group-hover/flow:-right-12 lg:group-hover/flow:-right-14',
      textShift: '-translate-x-2.5 sm:-translate-x-3.5 lg:-translate-x-4 group-hover/flow:translate-x-2.5 sm:group-hover/flow:translate-x-3.5 lg:group-hover/flow:translate-x-4',
    },
  }[size];

  // Variant color definitions - seamless hover transition, no outer border rim
  const variantConfig = {
    primary: {
      button:
        'bg-accent text-white border-[1.5px] border-accent hover:border-transparent shadow-sm shadow-red-950/20',
      circle: 'bg-white',
      arrow: 'stroke-white group-hover/flow:stroke-black',
      hoverText: 'group-hover/flow:text-black',
    },
    secondary: {
      button:
        'bg-white/5 text-white border-[1.5px] border-white/20 hover:border-transparent backdrop-blur-sm',
      circle: 'bg-white',
      arrow: 'stroke-white group-hover/flow:stroke-black',
      hoverText: 'group-hover/flow:text-black',
    },
    white: {
      // White button -> turns red on hover ("white comes red")
      button:
        'bg-white text-black border-0 hover:border-0 shadow-sm',
      circle: 'bg-accent',
      arrow: 'stroke-black group-hover/flow:stroke-white',
      hoverText: 'group-hover/flow:text-white',
    },
    'white-red': {
      // White button -> blooms with a tiny soft white-red (blush) on hover, stands out crisp on red backgrounds
      button:
        'bg-white text-[#111111] border-0 hover:border-0 shadow-sm',
      circle: 'bg-[#fff1f2]',
      arrow: 'stroke-[#111111] group-hover/flow:stroke-accent',
      hoverText: 'group-hover/flow:text-accent',
    },
    'white-gray': {
      // White button -> blooms with a tiny soft gray on hover, stands out crisp on red backgrounds
      button:
        'bg-white text-[#111111] border-0 hover:border-0 shadow-sm',
      circle: 'bg-neutral-100',
      arrow: 'stroke-[#111111] group-hover/flow:stroke-[#111111]',
      hoverText: 'group-hover/flow:text-[#111111]',
    },
    dark: {
      button:
        'bg-transparent text-[#111111] border-[1.5px] border-[#333333]/40 hover:border-transparent',
      circle: 'bg-[#111111]',
      arrow: 'stroke-[#111111] group-hover/flow:stroke-white',
      hoverText: 'group-hover/flow:text-white',
    },
    outline: {
      button:
        'bg-transparent text-text-primary border-[1.5px] border-gray-300 hover:border-transparent',
      circle: 'bg-accent',
      arrow: 'stroke-text-primary group-hover/flow:stroke-white',
      hoverText: 'group-hover/flow:text-white',
    },
    'accent-outline': {
      button:
        'bg-transparent text-accent border-[1.5px] border-accent/50 hover:border-transparent',
      circle: 'bg-accent',
      arrow: 'stroke-accent group-hover/flow:stroke-white',
      hoverText: 'group-hover/flow:text-white',
    },
    ghost: {
      button:
        'bg-transparent text-text-muted hover:text-white border-0 hover:border-0',
      circle: 'bg-white/10',
      arrow: 'stroke-current',
      hoverText: 'group-hover/flow:text-white',
    },
  }[variant];

  const buttonClasses = cn(
    baseClasses,
    sizeConfig.padding,
    variantConfig.button,
    fullWidth ? 'w-full' : '',
    className
  );

  const innerContent = (
    <>
      {/* Sliding Left Arrow (enters smoothly from left on hover, centered vertically) */}
      {showArrow && (
        <ArrowComponent
          className={cn(
            'absolute top-1/2 -translate-y-1/2 stroke-[2.2] fill-none z-[9] pointer-events-none transition-all duration-1000 ease-flow-smooth',
            sizeConfig.iconClass,
            sizeConfig.leftArrow,
            variantConfig.arrow
          )}
          aria-hidden="true"
        />
      )}

      {/* Button Text (shifts smoothly to compensate for entering arrow) */}
      <span
        className={cn(
          'relative z-[2] whitespace-nowrap transition-all duration-1000 ease-flow-smooth',
          showArrow ? sizeConfig.textShift : '',
          variantConfig.hoverText
        )}
      >
        {content}
      </span>

      {/* Expanding Circular Fill on Hover — dynamically sized beyond diagonal so even fullWidth buttons fill 100% */}
      <span
        style={{ width: 'max(155%, 240px)' }}
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full pointer-events-none z-[1]',
          'scale-0 group-hover/flow:scale-100 transition-transform duration-1000 ease-flow-smooth origin-center',
          variantConfig.circle
        )}
        aria-hidden="true"
      />

      {/* Sliding Right Arrow (exits smoothly to right on hover, centered vertically) */}
      {showArrow && (
        <ArrowComponent
          className={cn(
            'absolute top-1/2 -translate-y-1/2 stroke-[2.2] fill-none z-[9] pointer-events-none transition-all duration-1000 ease-flow-smooth',
            sizeConfig.iconClass,
            sizeConfig.rightArrow,
            variantConfig.arrow
          )}
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    const isAnchorOrExternal = href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:');
    if (isAnchorOrExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={buttonClasses}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <Link href={href} className={buttonClasses} target={target} rel={rel}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {innerContent}
    </button>
  );
}

export default FlowButton;
