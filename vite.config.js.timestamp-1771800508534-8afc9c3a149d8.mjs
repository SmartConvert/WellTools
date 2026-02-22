// vite.config.js
import { defineConfig } from "file:///D:/BADISS/WellTools/node_modules/vite/dist/node/index.js";
import { imagetools } from "file:///D:/BADISS/WellTools/node_modules/vite-imagetools/dist/index.js";
import react from "file:///D:/BADISS/WellTools/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///D:/BADISS/WellTools/node_modules/@tailwindcss/vite/dist/index.mjs";
import prerender from "vite-plugin-prerender";
import path from "path";
var __vite_injected_original_dirname = "D:\\BADISS\\WellTools";
var customPrerender = prerender.default || prerender;
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    customPrerender({
      staticDir: path.join(__vite_injected_original_dirname, "dist"),
      routes: [
        "/",
        "/bmi-calculator-for-women-and-men",
        "/bmichart-and-bmi-categories-guide",
        "/daily-calorie-calculator-for-weight-loss",
        "/daily-water-intake-calculator-by-weight",
        "/sleep-calculator-and-sleep-cycles",
        "/sleep-hygiene-and-circadian-rhythm-guide",
        "/ideal-weight-calculator-for-men-and-women",
        "/precise-body-fat-percentage-calculator",
        "/body-fat-percentage-chart-and-health-guide",
        "/bmr-calculator-mifflin-st-jeor",
        "/macro-calculator-for-muscle-gain-and-fat-loss",
        "/one-rep-max-calculator-for-weightlifting",
        "/custom-meal-planner-and-nutrition-guide",
        "/intermittent-fasting-schedule-calculator",
        "/blog-health-and-fitness-tips",
        "/daily-health-and-weight-tracker",
        "/about-welltools-scientific-health-calculators",
        "/science-behind-our-health-calculators",
        "/our-medical-and-fitness-experts",
        "/contact-welltools-support-and-feedback",
        "/privacy-policy",
        "/terms-of-use",
        "/medical-disclaimer",
        "/editorial-policy"
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-charts": ["recharts"],
          "vendor-utils": ["lucide-react"],
          "vendor-pdf": ["jspdf", "html2canvas"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxCQURJU1NcXFxcV2VsbFRvb2xzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxCQURJU1NcXFxcV2VsbFRvb2xzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9CQURJU1MvV2VsbFRvb2xzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgaW1hZ2V0b29scyB9IGZyb20gJ3ZpdGUtaW1hZ2V0b29scydcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnXHJcbmltcG9ydCBwcmVyZW5kZXIgZnJvbSAndml0ZS1wbHVnaW4tcHJlcmVuZGVyJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuY29uc3QgY3VzdG9tUHJlcmVuZGVyID0gcHJlcmVuZGVyLmRlZmF1bHQgfHwgcHJlcmVuZGVyXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICB0YWlsd2luZGNzcygpLFxyXG4gICAgaW1hZ2V0b29scygpLFxyXG4gICAgY3VzdG9tUHJlcmVuZGVyKHtcclxuICAgICAgc3RhdGljRGlyOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnZGlzdCcpLFxyXG4gICAgICByb3V0ZXM6IFtcclxuICAgICAgICAnLycsXHJcbiAgICAgICAgJy9ibWktY2FsY3VsYXRvci1mb3Itd29tZW4tYW5kLW1lbicsXHJcbiAgICAgICAgJy9ibWljaGFydC1hbmQtYm1pLWNhdGVnb3JpZXMtZ3VpZGUnLFxyXG4gICAgICAgICcvZGFpbHktY2Fsb3JpZS1jYWxjdWxhdG9yLWZvci13ZWlnaHQtbG9zcycsXHJcbiAgICAgICAgJy9kYWlseS13YXRlci1pbnRha2UtY2FsY3VsYXRvci1ieS13ZWlnaHQnLFxyXG4gICAgICAgICcvc2xlZXAtY2FsY3VsYXRvci1hbmQtc2xlZXAtY3ljbGVzJyxcclxuICAgICAgICAnL3NsZWVwLWh5Z2llbmUtYW5kLWNpcmNhZGlhbi1yaHl0aG0tZ3VpZGUnLFxyXG4gICAgICAgICcvaWRlYWwtd2VpZ2h0LWNhbGN1bGF0b3ItZm9yLW1lbi1hbmQtd29tZW4nLFxyXG4gICAgICAgICcvcHJlY2lzZS1ib2R5LWZhdC1wZXJjZW50YWdlLWNhbGN1bGF0b3InLFxyXG4gICAgICAgICcvYm9keS1mYXQtcGVyY2VudGFnZS1jaGFydC1hbmQtaGVhbHRoLWd1aWRlJyxcclxuICAgICAgICAnL2Jtci1jYWxjdWxhdG9yLW1pZmZsaW4tc3QtamVvcicsXHJcbiAgICAgICAgJy9tYWNyby1jYWxjdWxhdG9yLWZvci1tdXNjbGUtZ2Fpbi1hbmQtZmF0LWxvc3MnLFxyXG4gICAgICAgICcvb25lLXJlcC1tYXgtY2FsY3VsYXRvci1mb3Itd2VpZ2h0bGlmdGluZycsXHJcbiAgICAgICAgJy9jdXN0b20tbWVhbC1wbGFubmVyLWFuZC1udXRyaXRpb24tZ3VpZGUnLFxyXG4gICAgICAgICcvaW50ZXJtaXR0ZW50LWZhc3Rpbmctc2NoZWR1bGUtY2FsY3VsYXRvcicsXHJcbiAgICAgICAgJy9ibG9nLWhlYWx0aC1hbmQtZml0bmVzcy10aXBzJyxcclxuICAgICAgICAnL2RhaWx5LWhlYWx0aC1hbmQtd2VpZ2h0LXRyYWNrZXInLFxyXG4gICAgICAgICcvYWJvdXQtd2VsbHRvb2xzLXNjaWVudGlmaWMtaGVhbHRoLWNhbGN1bGF0b3JzJyxcclxuICAgICAgICAnL3NjaWVuY2UtYmVoaW5kLW91ci1oZWFsdGgtY2FsY3VsYXRvcnMnLFxyXG4gICAgICAgICcvb3VyLW1lZGljYWwtYW5kLWZpdG5lc3MtZXhwZXJ0cycsXHJcbiAgICAgICAgJy9jb250YWN0LXdlbGx0b29scy1zdXBwb3J0LWFuZC1mZWVkYmFjaycsXHJcbiAgICAgICAgJy9wcml2YWN5LXBvbGljeScsXHJcbiAgICAgICAgJy90ZXJtcy1vZi11c2UnLFxyXG4gICAgICAgICcvbWVkaWNhbC1kaXNjbGFpbWVyJyxcclxuICAgICAgICAnL2VkaXRvcmlhbC1wb2xpY3knXHJcbiAgICAgIF0sXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAndmVuZG9yLXJlYWN0JzogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcclxuICAgICAgICAgICd2ZW5kb3ItY2hhcnRzJzogWydyZWNoYXJ0cyddLFxyXG4gICAgICAgICAgJ3ZlbmRvci11dGlscyc6IFsnbHVjaWRlLXJlYWN0J10sXHJcbiAgICAgICAgICAndmVuZG9yLXBkZic6IFsnanNwZGYnLCAnaHRtbDJjYW52YXMnXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsU0FBUyxvQkFBb0I7QUFDOVEsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZUFBZTtBQUN0QixPQUFPLFVBQVU7QUFMakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxrQkFBa0IsVUFBVSxXQUFXO0FBRzdDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxJQUNYLGdCQUFnQjtBQUFBLE1BQ2QsV0FBVyxLQUFLLEtBQUssa0NBQVcsTUFBTTtBQUFBLE1BQ3RDLFFBQVE7QUFBQSxRQUNOO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLGdCQUFnQixDQUFDLFNBQVMsV0FBVztBQUFBLFVBQ3JDLGlCQUFpQixDQUFDLFVBQVU7QUFBQSxVQUM1QixnQkFBZ0IsQ0FBQyxjQUFjO0FBQUEsVUFDL0IsY0FBYyxDQUFDLFNBQVMsYUFBYTtBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLElBQ3ZCLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
