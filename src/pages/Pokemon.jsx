import React, { useState, useEffect } from 'react';
import { usePokemonList } from '../hooks/usePokemon';
import PokeCard from '../components/PokeCard';
import ReactPaginate from 'react-paginate';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';

const ITEMS_PER_PAGE = 20;

export default function Pokemon() {
  const { data: pokemonList, loading } = usePokemonList();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageSettings, setPageSettings] = useState({
    pageRangeDisplayed: 5,
    marginPagesDisplayed: 2,
  });

  const pageCount = Math.ceil(pokemonList.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const offset = currentPage * ITEMS_PER_PAGE;
    setCurrentItems(pokemonList.slice(offset, offset + ITEMS_PER_PAGE));
  }, [currentPage, pokemonList]);

  useEffect(() => {
    const updatePageSettings = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setPageSettings({ pageRangeDisplayed: 1, marginPagesDisplayed: 1 });
      } else if (width < 768) {
        setPageSettings({ pageRangeDisplayed: 2, marginPagesDisplayed: 1 });
      } else if (width < 992) {
        setPageSettings({ pageRangeDisplayed: 3, marginPagesDisplayed: 2 });
      } else {
        setPageSettings({ pageRangeDisplayed: 5, marginPagesDisplayed: 2 });
      }
    };

    updatePageSettings();
    window.addEventListener('resize', updatePageSettings);
    return () => window.removeEventListener('resize', updatePageSettings);
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
       {/* Title Pokémon */}
      <h2 className="page-title text-center mb-1 d-flex align-items-center justify-content-center gap-2">
        <img
          src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/6a/latest/20230115164405/Pok%C3%A9_Ball_EP.png/150px-Pok%C3%A9_Ball_EP.png"
          alt="Poké Ball"
          className="pokeball-icon"
          width="40"
          height="40"
        />
        <span className="text">Pokémon</span>
      </h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {currentItems.map((pokemon) => (
          <div className="col" key={pokemon.name}>
            <PokeCard item={pokemon} />
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            previousLabel={
              <span title="Previous page" aria-label="Previous">
                <i className="bi bi-arrow-left" />
              </span>
            }
            nextLabel={
              <span title="Next page" aria-label="Next">
                <i className="bi bi-arrow-right" />
              </span>
            }
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageRangeDisplayed={pageSettings.pageRangeDisplayed}
            marginPagesDisplayed={pageSettings.marginPagesDisplayed}
          />
        </div>
      )}
    </div>
  );
}
