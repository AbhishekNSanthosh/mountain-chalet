import re

with open('inline-styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

style_dict = {}
for match in re.finditer(r'\.(vl-inline-\d+)\s*\{\s*(.*?)\s*\}', css_content):
    style_dict[match.group(1)] = match.group(2)

def heal_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We find all tags containing vl-inline-
    def replacer(m):
        tag_content = m.group(1) # The whole content between < and >
        
        # find vl-inline-X inside class="..."
        class_m = re.search(r'class=(["\'])(.*?)\1', tag_content)
        if not class_m:
            return '<' + tag_content + '>'
            
        quote = class_m.group(1)
        classes = class_m.group(2).split()
        
        inline_classes = [c for c in classes if c.startswith('vl-inline-')]
        if not inline_classes:
            return '<' + tag_content + '>'
            
        c = inline_classes[0]
        style_val = style_dict.get(c, '')
        
        # remove inline class
        classes.remove(c)
        
        # Construct the restored tag content WITHOUT the garbage that comes after the vl-inline-X quote!
        # The garbage was injected because attrs_str completely appended after_style.
        # So everything after the end quote of the class attribute, up to the end of the tag content, is GARBAGE, EXCEPT if there were valid attributes before style.
        # But wait! In my original regex: before_style was ALL attributes before style="..."
        # after_style was ALL garbage from inside the style value + actual after attributes.
        # So if we just use before_style, we lose after_style attributes.
        # This is risky. But since we ran git checkout -- ., we only care about v3-activity-detail.html !
        pass
