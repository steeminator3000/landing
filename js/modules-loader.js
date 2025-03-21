/**
 * Module Loader for LiquidVest Landing Page
 * Loads HTML components dynamically
 */

document.addEventListener('DOMContentLoaded', function() {
    // HTML modules to load
    const modules = [
        { id: 'header-container', path: 'modules/header.html' },
        { id: 'hero-container', path: 'modules/hero.html' },
        { id: 'features-container', path: 'modules/features.html' },
        { id: 'how-it-works-container', path: 'modules/how-it-works.html' },
        { id: 'ecosystems-container', path: 'modules/ecosystems.html' },
        { id: 'cta-container', path: 'modules/cta.html' },
        { id: 'footer-container', path: 'modules/footer.html' }
    ];
    
    // Load each module
    modules.forEach(module => {
        loadModule(module.id, module.path);
    });
    
    // Function to fetch and insert HTML modules
    function loadModule(containerId, filePath) {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                
                // Dispatch an event when the module is loaded
                const event = new CustomEvent('moduleLoaded', {
                    detail: { id: containerId, path: filePath }
                });
                document.dispatchEvent(event);
            })
            .catch(error => {
                console.error(`Error loading module ${filePath}:`, error);
                container.innerHTML = `<div class="error-message">Could not load module</div>`;
            });
    }
    
    // Listen for all modules loaded
    let loadedModules = 0;
    document.addEventListener('moduleLoaded', function() {
        loadedModules++;
        
        // When all modules are loaded
        if (loadedModules === modules.length) {
            document.dispatchEvent(new Event('allModulesLoaded'));
        }
    });
});
