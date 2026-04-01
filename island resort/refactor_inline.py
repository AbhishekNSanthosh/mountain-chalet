import os
import re

dir_path = '.'
html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]

style_map = {}
class_counter = 1

def style_to_class(style_str):
    global class_counter
    style_str = style_str.strip()
    if not style_str.endswith(';'): style_str += ';'
    style_str = re.sub(r'\s+', ' ', style_str)
    
    if style_str not in style_map:
        cls_name = f"vl-inline-{class_counter}"
        style_map[style_str] = cls_name
        class_counter += 1
    
    return style_map[style_str]

tag_pattern = re.compile(r'<([a-zA-Z0-9\-]+)\s+([^>]*?)style=[\'"]([^\'"]+?)[\'"]([^>]*)>')

for f_name in html_files:
    file_path = os.path.join(dir_path, f_name)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        tag_name = match.group(1)
        before_style = match.group(2)
        style_val = match.group(3)
        after_style = match.group(4)
        
        cls_name = style_to_class(style_val)
        
        attrs_str = before_style + after_style
        
        class_match = re.search(r'class=[\'"]([^\'"]*)[\'"]', attrs_str)
        if class_match:
            old_class = class_match.group(1)
            new_class = f"{old_class} {cls_name}".strip()
            attrs_str = attrs_str[:class_match.start(1)] + new_class + attrs_str[class_match.end(1):]
        else:
            attrs_str += f' class="{cls_name}"'
            
        return f'<{tag_name} {attrs_str.strip()}>'

    new_content = content
    # Sub recursively until no more style attributes (in case of weird duplicate attrs, though rare)
    new_content = tag_pattern.sub(replacer, new_content)
    
    if 'bootstrap.min.css' not in new_content:
        btsp_link = '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />\n'
        new_content = new_content.replace('</head>', btsp_link + '</head>')
        
    if 'bootstrap.bundle' not in new_content:
        btsp_js = '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>\n'
        new_content = new_content.replace('</body>', btsp_js + '</body>')

    if 'inline-styles.css' not in new_content:
        css_link = '  <link rel="stylesheet" href="inline-styles.css" />\n'
        if '</head>' in new_content:
            new_content = new_content.replace('</head>', css_link + '</head>')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

with open(os.path.join(dir_path, 'inline-styles.css'), 'w', encoding='utf-8') as f:
    f.write("/* Auto-generated utility classes from inline styles */\n")
    for style_str, cls_name in style_map.items():
        f.write(f".{cls_name} {{ {style_str} }}\n")

print(f"Extracted {class_counter - 1} unique inline styles into inline-styles.css")
