import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";
import { useState } from "react";

export interface SearchFilters {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface AdvancedProductSearchProps {
  onSearch: (filters: SearchFilters) => void;
  categories: string[];
}

export function AdvancedProductSearch({
  onSearch,
  categories,
}: AdvancedProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const handleSearch = () => {
    onSearch({
      searchTerm,
      category,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    setCategory("all");
    setPriceRange([0, 10000]);
    onSearch({
      searchTerm: "",
      category: "all",
      minPrice: 0,
      maxPrice: 10000,
    });
  };

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Search className="h-5 w-5" />
          Busca Avançada
        </h3>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          <X className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      </div>

      <div className="space-y-4">
        {/* Campo de busca por nome */}
        <div className="space-y-2">
          <Label htmlFor="search">Nome do Produto</Label>
          <Input
            id="search"
            placeholder="Digite o nome do produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* Filtro de categoria */}
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Categorias</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de faixa de preço */}
        <div className="space-y-2">
          <Label>Faixa de Preço</Label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label
                htmlFor="minPrice"
                className="text-xs text-muted-foreground"
              >
                Mínimo
              </Label>
              <Input
                id="minPrice"
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                min={0}
                max={priceRange[1]}
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="maxPrice"
                className="text-xs text-muted-foreground"
              >
                Máximo
              </Label>
              <Input
                id="maxPrice"
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                min={priceRange[0]}
                max={10000}
              />
            </div>
          </div>
          <div className="pt-2">
            <Slider
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              min={0}
              max={10000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>R$ {priceRange[0].toLocaleString("pt-BR")}</span>
              <span>R$ {priceRange[1].toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </div>

        {/* Botão de buscar */}
        <Button onClick={handleSearch} className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Buscar Produtos
        </Button>
      </div>
    </div>
  );
}
