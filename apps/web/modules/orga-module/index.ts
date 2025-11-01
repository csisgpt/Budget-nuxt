import { addServerHandler, addTemplate, defineNuxtModule, resolvePath } from '@nuxt/kit';

export interface ModuleOptions {
  enableWelcomeRoute: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'orga-module',
    configKey: 'orgaModule'
  },
  defaults: {
    enableWelcomeRoute: true
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.tenantHelperInjected = true;

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.imports = nitroConfig.imports || {};
      nitroConfig.imports.presets = nitroConfig.imports.presets || [];
      nitroConfig.imports.presets.push({
        from: '~/server/utils/tenant',
        imports: ['resolveTenantFromEvent']
      });
    });

    addTemplate({
      filename: 'orga-helper.mjs',
      getContents: () => 'export const orgaHelper = () => "OrgaFlow";'
    });

    nuxt.hook('imports:extend', (imports) => {
      imports.push({ name: 'orgaHelper', from: '#build/orga-helper.mjs' });
    });

    if (options.enableWelcomeRoute) {
      addServerHandler({
        route: '/api/orga/welcome',
        method: 'get',
        handler: resolvePath('./runtime/welcome.get')
      });
    }
  }
});
