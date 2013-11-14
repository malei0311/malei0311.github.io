# Require any additional compass plugins here.
require 'semantic-ui-sass'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "styles"
sass_dir = "sass/dist"
images_dir = "images"
javascripts_dir = "scripts"
environment = :development

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

if environment != :production
enable_sourcemaps = true
sass_options = {:sourcemap => true}
end

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
