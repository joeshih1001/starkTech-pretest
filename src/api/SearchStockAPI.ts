const URL = `https://api.finmindtrade.com/api/v4/data?`;
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wMy0wNiAxNTowOTo0MyIsInVzZXJfaWQiOiJpbmpvZTEwMDEiLCJpcCI6IjEuMzQuMTg1Ljg2In0.VVJlZnrc6tlDiW3u78KGjbW2cb65e0_kA7T7ThlBeIo`;
interface RevenueProps {
  stockId: string | null;
  startDate: string;
  endDate: string;
}
export const SearchStockAPI = {
  SearchStock: async () => {
    try {
      const response = await fetch(
        `${URL}dataset=TaiwanStockInfo&data_id=&start_date=2021-09-13&end_date=2021-09-17&token=${TOKEN}`,
        {
          method: "get",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was fail");
      }
      const data = await response.json();
      const newData = data.data.map((v: any) => {
        return {
          stock_id: v.stock_id,
          stock_name: v.stock_name,
          stock_option: v.stock_id + " " + v.stock_name,
        };
      });
      const uniqueArr = Array.from(
        new Set(newData.map((item: any) => JSON.stringify(item)))
      ).map((item) => JSON.parse(item as string));

      return uniqueArr;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },

  GetStockRevenue: async (revenueProps: RevenueProps) => {
    try {
      const response = await fetch(
        `${URL}dataset=TaiwanStockMonthRevenue&data_id=${revenueProps.stockId}&start_date=${revenueProps.startDate}&end_date=${revenueProps.endDate}&token=${TOKEN}`,
        {
          method: "get",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was fail");
      }
      const data = await response.json();
      if (data.data.length === 0) {
        return data.data;
      }
      const revenueGrowthRate = data.data.map((d: any, i: number) => {
        const prevItemIndex = i - 12;
        if (prevItemIndex >= 0) {
          const prevItem = data.data[prevItemIndex];
          const result = (d.revenue / prevItem.revenue - 1) * 100;
          return Math.round(result * 100) / 100
        }else {
            return 0
        }
      }).filter((v: any, i: number) => i > 11);
      const revenueMonthData = data.data
        .filter((v: any, i: number) => i > 11)
        .map((d: any) => {
          return d.revenue / 1000;
        });
      const revenueMonth = data.data
        .filter((v: any, i: number) => i > 11)
        .map((d: any) => {
          return d.date;
        });
      const newDataObj = {
        revenueMonthData: revenueMonthData,
        revenueMonth: revenueMonth,
        revenueGrowthRate: revenueGrowthRate,
      };
      return newDataObj;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },
};
