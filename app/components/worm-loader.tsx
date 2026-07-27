"use client";

type WormLoaderProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function WormLoader({ size = "md", className = "" }: WormLoaderProps) {
  const sizeClass =
    size === "sm" ? "worm-loader--sm" : size === "lg" ? "worm-loader--lg" : "worm-loader--md";

  return (
    <div className={`worm-loader ${sizeClass} ${className}`.trim()} role="status" aria-label="Loading">
      <svg className="worm-loader__svg" viewBox="0 0 128 128" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="worm-grad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="40%" stopColor="#fff" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <linearGradient id="worm-grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="60%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id="worm-mask1">
            <rect x="0" y="0" width="128" height="128" fill="url(#worm-grad1)" />
          </mask>
          <mask id="worm-mask2">
            <rect x="0" y="0" width="128" height="128" fill="url(#worm-grad2)" />
          </mask>
        </defs>
        <g fill="none" strokeLinecap="round" strokeWidth="16">
          <g stroke="#111111">
            <path
              className="worm-loader__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              stroke="#1b3e2f"
              strokeDasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g className="worm-loader__worm2" transform="translate(-42,0)">
                <path
                  className="worm-loader__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  strokeDasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
          <g stroke="#000000" mask="url(#worm-mask1)">
            <path
              className="worm-loader__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              strokeDasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g className="worm-loader__worm2" transform="translate(-42,0)">
                <path
                  className="worm-loader__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  strokeDasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
          <g stroke="#1b3e2f" mask="url(#worm-mask2)">
            <path
              className="worm-loader__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              strokeDasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g className="worm-loader__worm2" transform="translate(-42,0)">
                <path
                  className="worm-loader__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  strokeDasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
