import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  faAdd,
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Accordion = ({ data }) => {
  return (
    <div className="accordion">
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title} items={item.items} />
      ))}
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

const AccordionItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  // Gestionnaire de changement de valeur de la recherche
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setVisibleCount(3); // Réinitialiser le nombre visible à 3 lors de la recherche
  };

  // Filtrer les items en fonction de la recherche
  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Déterminer les items à afficher en fonction de la pagination
  const displayedItems = filteredItems.slice(0, visibleCount);

  // Fonction pour afficher tous les projets
  const showMore = () => {
    setVisibleCount(items.length);
  };

  // Fonction pour afficher moins de projets
  const showLess = () => {
    setVisibleCount(3);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-item__header">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="accordion-item__header-title"
        >
          {title}
        </button>
        <li className="accordion-item__header-icon">
          <Link to="/dashboard/add-project">
            <FontAwesomeIcon icon={faAdd} />
          </Link>
        </li>
      </div>
      <ul
        className={`accordion-item__content ${
          isOpen ? "accordion-item__content--active" : ""
        }`}
      >
        <div className="accordion-item__search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search..."
            // className="accordion-item__search-bar"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="accordion-item__search-bar-icon"
          />
        </div>
        {displayedItems.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.text}</a>
          </li>
        ))}
        {filteredItems.length > visibleCount ? (
          <button className="btn btn__show" onClick={showMore}>
            Voir plus{" "}
            <FontAwesomeIcon icon={faChevronDown} className="btn__show-icon" />
          </button>
        ) : (
          visibleCount > 3 && (
            <button className="btn btn__show" onClick={showLess}>
              Voir moins{" "}
              <FontAwesomeIcon icon={faChevronUp} className="btn__show-icon" />
            </button>
          )
        )}
      </ul>
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};
