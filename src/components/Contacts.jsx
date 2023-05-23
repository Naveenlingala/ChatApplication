import { useEffect } from "react";
import { Contact } from "./Contact";

export function Contacts({ results, isSearch, setName }) {
  return (
    <div id="contacts">
      <ul>
        {/* Render group contacts */}
        {results.group.map((result) => (
          <Contact
            isGroup={true}
            key={result}
            contactId={result}
            isSearch={isSearch}
            setName={setName}
          />
        ))}

        {/* Render private contacts */}
        {results.private.map((result) => (
          <Contact
            isGroup={false}
            key={result}
            contactId={result}
            isSearch={isSearch}
            setName={setName}
          />
        ))}
      </ul>
    </div>
  );
}
