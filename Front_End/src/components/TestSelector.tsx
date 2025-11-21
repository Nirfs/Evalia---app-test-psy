import { useState } from 'react'
import { InputText } from './InputText'

interface TestSelectorProps {
  testList: string[]
  selectedTests: string[]
  onSelect: (test: string) => void
}

export function TestSelector({ testList, selectedTests, onSelect }: TestSelectorProps) {
  const [search, setSearch] = useState('')

  return (
    <fieldset className="flex flex-col mt-6 gap-2">
      <legend className="text-md mb-1 font-bold">Choisir les tests à passer</legend>

      <InputText
        id="searchTest"
        label="Rechercher un test"
        placeholder="Tapez pour filtrer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-y-scroll mt-5 px-2 max-h-40">
        {testList
          .filter((test) => test.toLowerCase().includes(search.toLowerCase()))
          .map((test) => (
            <div key={test} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={test}
                name={test}
                checked={selectedTests.includes(test)}
                onChange={() => onSelect(test)}
              />
              <label htmlFor={test}>{test}</label>
            </div>
          ))}
      </div>
    </fieldset>
  )
}
