import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useState } from "react";

interface DateRangeFilterProps {
  onDateRangeChange: (days: 7 | 30 | 90) => void;
  currentRange?: 7 | 30 | 90;
}

export function DateRangeFilter({
  onDateRangeChange,
  currentRange = 30,
}: DateRangeFilterProps) {
  const [selectedRange, setSelectedRange] = useState<7 | 30 | 90>(currentRange);

  const handleRangeChange = (days: 7 | 30 | 90) => {
    setSelectedRange(days);
    onDateRangeChange(days);
  };

  const getRangeLabel = (days: 7 | 30 | 90) => {
    switch (days) {
      case 7:
        return "Últimos 7 dias";
      case 30:
        return "Últimos 30 dias";
      case 90:
        return "Últimos 90 dias";
    }
  };

  const getDateRange = (days: 7 | 30 | 90) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      });
    };

    return `${formatDate(startDate)} - ${formatDate(today)}`;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Período de Análise
            </CardTitle>
            <CardDescription>{getDateRange(selectedRange)}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          <Button
            variant={selectedRange === 7 ? "default" : "outline"}
            onClick={() => handleRangeChange(7)}
            className="flex-1 sm:flex-none"
          >
            7 dias
          </Button>
          <Button
            variant={selectedRange === 30 ? "default" : "outline"}
            onClick={() => handleRangeChange(30)}
            className="flex-1 sm:flex-none"
          >
            30 dias
          </Button>
          <Button
            variant={selectedRange === 90 ? "default" : "outline"}
            onClick={() => handleRangeChange(90)}
            className="flex-1 sm:flex-none"
          >
            90 dias
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Inline version of date filter for use within cards
 */
export function InlineDateRangeFilter({
  onDateRangeChange,
  currentRange = 30,
}: DateRangeFilterProps) {
  const [selectedRange, setSelectedRange] = useState<7 | 30 | 90>(currentRange);

  const handleRangeChange = (days: 7 | 30 | 90) => {
    setSelectedRange(days);
    onDateRangeChange(days);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={selectedRange === 7 ? "default" : "outline"}
        size="sm"
        onClick={() => handleRangeChange(7)}
      >
        7d
      </Button>
      <Button
        variant={selectedRange === 30 ? "default" : "outline"}
        size="sm"
        onClick={() => handleRangeChange(30)}
      >
        30d
      </Button>
      <Button
        variant={selectedRange === 90 ? "default" : "outline"}
        size="sm"
        onClick={() => handleRangeChange(90)}
      >
        90d
      </Button>
    </div>
  );
}
