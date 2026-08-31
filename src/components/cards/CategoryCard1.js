// Ported from Elora theme: src/views/cards/category/card1-loop.html
//
// The template's tile was a photo tile. Nearly every image embedded in the
// imported posts is dead on the origin server, so `img` is normally absent
// and the tile falls back to a brand-tinted panel carrying the topic name
// and its real post count, rather than borrowing an unrelated photo.
export default function CategoryCard1({ classList, img, linkpage_category, category, count, tint = 0 }) {
  return (
    <div className={classList}>
      <div
        className={`category-card style-1 w-100 hover-up hover-linear-1${img ? "" : " no-image"}`}
        data-background={img || undefined}
        style={img ? undefined : { "--tile-tint": tint }}
      >
        <div className="post-content text-center">
          <h6 className="categories style-1 mb-0">
            <a href={linkpage_category} className="link-effect-1">
              <span className="text-nowrap">
                <span className="text-1 text-hover-linear-1">{category}</span>
                <span className="text-2 text-hover-linear-1">{category}</span>
              </span>
            </a>
          </h6>
          {count ? <span className="post-count fs-14 fw-medium">{count === 1 ? "1 article" : `${count} articles`}</span> : null}
        </div>
      </div>
    </div>
  );
}
