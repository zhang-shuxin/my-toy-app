function DataControlPage({
  savedToys,
  adminSearch,
  setAdminSearch,
  adminError,
  fetchToys,
  handleAdminDeleteToy,
  handleAdminDeleteComment,
  onBack,
}) {
  const filteredAdminToys = savedToys.filter((toy) => {
    const searchValue = adminSearch.trim().toLowerCase();
    if (!searchValue) return true;

    return [
      toy.id,
      toy.story,
      toy.date,
      ...toy.comments.map((comment) => comment.text),
    ].some((value) => String(value || '').toLowerCase().includes(searchValue));
  });

  return (
    <div className="mobile-container data-control-page">
      <header className="data-control-header">
        <button className="pretty-back-btn" onClick={onBack}>
          BACK
        </button>
        <div>
          <p className="data-control-eyebrow">STAFF AREA</p>
          <h1>Data Control</h1>
        </div>
        <button
          className="data-control-refresh"
          onClick={() => fetchToys().catch((error) => console.error(error))}
          aria-label="Refresh data"
        >
          ↻
        </button>
      </header>

      <main className="data-control-content">
        <section className="data-control-summary">
          <div>
            <strong>{savedToys.length}</strong>
            <span>toys</span>
          </div>
          <div>
            <strong>{savedToys.reduce((total, toy) => total + toy.comments.length, 0)}</strong>
            <span>comments</span>
          </div>
        </section>

        <label className="data-control-search">
          <span>Search records</span>
          <input
            type="search"
            value={adminSearch}
            onChange={(event) => setAdminSearch(event.target.value)}
            placeholder="Search stories, comments, or dates"
          />
        </label>

        {adminError && <p className="data-control-error" role="alert">{adminError}</p>}

        <div className="data-control-records">
          {filteredAdminToys.length === 0 ? (
            <p className="data-control-empty">No matching records.</p>
          ) : (
            filteredAdminToys.map((toy) => (
              <article className="data-control-card" key={toy.id}>
                <div className="data-control-card-header">
                  <div className="data-control-image">
                    {toy.image ? (
                      <img src={toy.image} alt={`Toy ${toy.id}`} />
                    ) : (
                      <span aria-hidden="true">?</span>
                    )}
                  </div>
                  <div>
                    <h2>Toy #{toy.id}</h2>
                    <p>{toy.date} · {toy.comments.length} comment{toy.comments.length === 1 ? '' : 's'}</p>
                  </div>
                  <button className="data-control-delete" onClick={() => handleAdminDeleteToy(toy)}>
                    DELETE
                  </button>
                </div>
                <p className="data-control-story">{toy.story || 'No story provided.'}</p>
                <dl className="data-control-meta">
                  <div><dt>Position</dt><dd>{toy.x.toFixed(1)}%, {toy.y.toFixed(1)}%</dd></div>
                  <div><dt>Scale</dt><dd>{toy.scale.toFixed(1)}%</dd></div>
                </dl>
                {toy.comments.length > 0 && (
                  <ul className="data-control-comments">
                    {toy.comments.map((comment) => (
                      <li key={comment.id}>
                        <div className="data-control-comment-header">
                          <span>{comment.date}</span>
                          <button
                            className="data-control-comment-delete"
                            onClick={() => handleAdminDeleteComment(comment)}
                          >
                            DELETE
                          </button>
                        </div>
                        {comment.text}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default DataControlPage;
